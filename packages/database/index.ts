import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

function parseEnvFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    if (!key || process.env[key]) continue;

    let value = line.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function ensureDatabaseEnv() {
  if (process.env.DATABASE_URL) return;

  const candidates: string[] = [];
  let cursor = process.cwd();

  while (true) {
    candidates.push(path.resolve(cursor, '.env'));
    candidates.push(path.resolve(cursor, 'packages/database/.env'));

    const parent = path.dirname(cursor);
    if (parent === cursor) break;
    cursor = parent;
  }

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    parseEnvFile(candidate);
    if (process.env.DATABASE_URL) return;
  }
}

ensureDatabaseEnv();

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export * from '@prisma/client';
