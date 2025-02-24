const prisma = require("../utils/prismaClient");

async function executeWithPrisma(callback) {
  try {
    await callback(prisma);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { executeWithPrisma };
