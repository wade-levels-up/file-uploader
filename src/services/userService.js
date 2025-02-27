const bcrypt = require("bcryptjs");
const { executeWithPrisma } = require("../utils/executeWithPrisma");

async function getUserByUsername(username) {
  return await executeWithPrisma(async (prisma) => {
    return await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  });
}

async function createNewUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await executeWithPrisma(async (prisma) => {
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
  });
}

module.exports = { getUserByUsername, createNewUser };
