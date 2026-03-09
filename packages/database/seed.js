const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Clear existing
  await prisma.adminTicketDeleteRequest.deleteMany()
  await prisma.adminTicketDeleteAuthorization.deleteMany()
  await prisma.adminTicketComment.deleteMany()
  await prisma.adminTicket.deleteMany()
  await prisma.adminManagedUser.deleteMany()
  await prisma.event.deleteMany()
  await prisma.package.deleteMany()
  await prisma.user.deleteMany()

  console.log('Cleared database.')

  // 1. Create Users
  const customer = await prisma.user.create({
    data: { email: 'customer@example.com', role: 'CUSTOMER' },
  })

  const courier1 = await prisma.user.create({
    data: { email: 'courier1@delivery.com', role: 'COURIER' },
  })

  const relay1 = await prisma.user.create({
    data: { email: 'relay1@shops.com', role: 'RELAY_OWNER' },
  })

  console.log('Created users (Courier & Relay).')

  // 2. Create Packages
  const pkg1 = await prisma.package.create({
    data: {
      trackingId: 'TRK-123456',
      senderId: customer.id,
      receiverId: customer.id, // For simplicity in seeding
      status: 'PENDING',
      currentLocation: 'Warehouse A',
    },
  })

  const pkg2 = await prisma.package.create({
    data: {
      trackingId: 'TRK-987654',
      senderId: customer.id,
      receiverId: customer.id,
      status: 'PICKED_UP',
      currentLocation: 'Courier Van 12',
    },
  })

  // 3. Create Events
  await prisma.event.create({
    data: {
      packageId: pkg1.id,
      description: 'Package registered by sender.',
      location: 'Warehouse A',
    },
  })

  await prisma.event.create({
    data: {
      packageId: pkg2.id,
      description: 'Package picked up by courier.',
      location: 'Warehouse A',
    },
  })

  // 4. Create Admin Tickets
  const createdTickets = await Promise.all([
    prisma.adminTicket.create({
      data: {
        ticketNo: 'TCK-1001',
        subject: 'Missing handoff scan',
        description: 'Courier handoff event was not captured at relay checkpoint.',
        priority: 'HIGH',
        status: 'OPEN',
        ownerName: 'Ops Team 3',
        ownerEmail: 'ops-team-3@delivery.com',
        createdBy: 'system-seed',
      },
    }),
    prisma.adminTicket.create({
      data: {
        ticketNo: 'TCK-1008',
        subject: 'Address mismatch review',
        description: 'Delivery address differs between label and OMS order.',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        ownerName: 'Routing Desk',
        ownerEmail: 'routing-desk@delivery.com',
        createdBy: 'system-seed',
      },
    }),
    prisma.adminTicket.create({
      data: {
        ticketNo: 'TCK-1013',
        subject: 'Customer status clarification',
        description: 'Customer reported stale tracking status for delivered package.',
        priority: 'LOW',
        status: 'OPEN',
        ownerName: 'Support Team',
        ownerEmail: 'support@delivery.com',
        createdBy: 'system-seed',
      },
    }),
  ])

  await prisma.adminTicketComment.createMany({
    data: [
      {
        ticketId: createdTickets[0].id,
        body: 'Investigating scanner logs from relay checkpoint.',
        author: 'mod@delivery.com',
      },
      {
        ticketId: createdTickets[0].id,
        body: 'Requested courier-side rescan and manual confirmation.',
        author: 'agent@delivery.com',
      },
      {
        ticketId: createdTickets[1].id,
        body: 'Routing desk validated mismatch; awaiting sender confirmation.',
        author: 'admin@delivery.com',
      },
    ],
  })

  await prisma.adminTicketDeleteAuthorization.create({
    data: {
      moderatorEmail: 'mod@delivery.com',
      isActive: true,
      grantedBy: 'admin@delivery.com',
    },
  })

  await prisma.adminTicketDeleteRequest.create({
    data: {
      ticketId: createdTickets[2].id,
      reason: 'Ticket duplicated in queue after customer follow-up.',
      requestedBy: 'mod@delivery.com',
      status: 'PENDING',
    },
  })

  console.log('Created packages and events.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
