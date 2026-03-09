#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECTS=("apps/admin" "apps/customer" "apps/intranet")

echo "Workspace: $ROOT_DIR"
echo "Projects: ${PROJECTS[*]}"
echo

read -r -p "GitHub username/org (used for default remote URLs): " GITHUB_OWNER
if [[ -z "$GITHUB_OWNER" ]]; then
  echo "GitHub owner is required."
  exit 1
fi

read -r -p "Push after setup? [y/N]: " PUSH_AFTER_SETUP
PUSH_AFTER_SETUP="${PUSH_AFTER_SETUP,,}"

read -r -p "Initialize main workspace git repo too? [y/N]: " INIT_ROOT_REPO
INIT_ROOT_REPO="${INIT_ROOT_REPO,,}"

if [[ "$INIT_ROOT_REPO" == "y" || "$INIT_ROOT_REPO" == "yes" ]]; then
  echo
  echo "=== workspace root ==="

  if [[ ! -d "$ROOT_DIR/.git" ]]; then
    git -C "$ROOT_DIR" init
    echo "Initialized root repository at $ROOT_DIR"
  else
    echo "Root repository already exists."
  fi

  if [[ -z "$(git -C "$ROOT_DIR" remote get-url origin 2>/dev/null || true)" ]]; then
    DEFAULT_ROOT_URL="https://github.com/$GITHUB_OWNER/deliver.git"
    read -r -p "Root remote URL [default: $DEFAULT_ROOT_URL]: " ROOT_REMOTE_URL
    ROOT_REMOTE_URL="${ROOT_REMOTE_URL:-$DEFAULT_ROOT_URL}"
    git -C "$ROOT_DIR" remote add origin "$ROOT_REMOTE_URL"
    echo "Added root origin -> $ROOT_REMOTE_URL"
  else
    echo "Root origin already set: $(git -C "$ROOT_DIR" remote get-url origin)"
  fi
fi

for project in "${PROJECTS[@]}"; do
  REPO_PATH="$ROOT_DIR/$project"
  REPO_NAME="$(basename "$project")"

  echo
  echo "=== $project ==="

  if [[ ! -d "$REPO_PATH" ]]; then
    echo "Skipping: folder not found -> $REPO_PATH"
    continue
  fi

  if [[ ! -d "$REPO_PATH/.git" ]]; then
    echo "Initializing git repository in $project"
    git -C "$REPO_PATH" init
  fi

  if [[ -z "$(git -C "$REPO_PATH" config user.name || true)" ]]; then
    echo "Warning: git user.name is not set for this repo."
  fi

  if [[ -z "$(git -C "$REPO_PATH" config user.email || true)" ]]; then
    echo "Warning: git user.email is not set for this repo."
  fi

  CURRENT_REMOTE="$(git -C "$REPO_PATH" remote get-url origin 2>/dev/null || true)"
  DEFAULT_URL="https://github.com/$GITHUB_OWNER/$REPO_NAME.git"

  echo "Current origin: ${CURRENT_REMOTE:-<none>}"
  read -r -p "Remote URL for $project [default: $DEFAULT_URL]: " REMOTE_URL
  REMOTE_URL="${REMOTE_URL:-$DEFAULT_URL}"

  if git -C "$REPO_PATH" remote get-url origin >/dev/null 2>&1; then
    git -C "$REPO_PATH" remote set-url origin "$REMOTE_URL"
    echo "Updated origin -> $REMOTE_URL"
  else
    git -C "$REPO_PATH" remote add origin "$REMOTE_URL"
    echo "Added origin -> $REMOTE_URL"
  fi

  git -C "$REPO_PATH" add -A

  if ! git -C "$REPO_PATH" diff --cached --quiet; then
    read -r -p "Commit message for $project [default: Initial commit]: " COMMIT_MSG
    COMMIT_MSG="${COMMIT_MSG:-Initial commit}"
    git -C "$REPO_PATH" commit -m "$COMMIT_MSG"
  else
    echo "No staged changes to commit in $project"
  fi

  git -C "$REPO_PATH" branch -M main

  if [[ "$PUSH_AFTER_SETUP" == "y" || "$PUSH_AFTER_SETUP" == "yes" ]]; then
    echo "Pushing $project to origin/main"
    git -C "$REPO_PATH" push -u origin main
  else
    echo "Push skipped for $project"
  fi

done

echo
echo "Done."
