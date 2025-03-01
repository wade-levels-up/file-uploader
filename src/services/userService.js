const bcrypt = require("bcryptjs");
const { executeWithPrisma } = require("../utils/executeWithPrisma");
const prisma = require("../utils/prismaClient");

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

async function getAllFolders(userId) {
  return await executeWithPrisma(async (prisma) => {
    const folders = await prisma.folder.findMany({
      where: {
        userId: userId,
      },
    });
    return folders;
  });
}

async function createNewFolder(name, userId, parentFolderId) {
  await executeWithPrisma(async (prisma) => {
    await prisma.folder.create({
      data: {
        name: name,
        userId: userId,
        parentFolderId: parentFolderId,
      },
    });
  });
}

async function deleteFolder(id) {
  await executeWithPrisma(async (prisma) => {
    await prisma.folder.delete({
      where: {
        id: id,
      },
    });
  });
}

module.exports = {
  getUserByUsername,
  createNewUser,
  createNewFolder,
  getAllFolders,
  deleteFolder,
};
