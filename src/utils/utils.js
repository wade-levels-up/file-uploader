const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function executeWithPrisma(mainFunction) {
  try {
    await mainFunction();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { executeWithPrisma };
