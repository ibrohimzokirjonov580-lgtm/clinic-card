const { PrismaClient } = require('@prisma/client');

// Use a singleton to prevent exhausting connection pool during development
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

module.exports = prisma;