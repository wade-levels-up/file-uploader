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

async function getFolderById(id) {
  return await executeWithPrisma(async (prisma) => {
    const folder = await prisma.folder.findUnique({
      where: {
        id: id,
      },
    });
    return folder;
  });
}

async function getFoldersByParentId(parentId) {
  return await executeWithPrisma(async (prisma) => {
    const folders = await prisma.folder.findMany({
      where: {
        parentFolderId: parentId,
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
    await prisma.file.deleteMany({
      where: {
        folderId: id,
      },
    });
    await prisma.folder.delete({
      where: {
        id: id,
      },
    });
  });
}

async function renameFolder(id, new_name) {
  await executeWithPrisma(async (prisma) => {
    await prisma.folder.update({
      data: {
        name: new_name,
      },
      where: {
        id: id,
      },
    });
  });
}

async function createNewFile(name, type, size, relativePath, folderId, userId) {
  await executeWithPrisma(async (prisma) => {
    await prisma.file.create({
      data: {
        name: name,
        type: type,
        size: size,
        relativePath: relativePath,
        folderId: folderId,
        userId: userId,
      },
    });
  });
}

async function getFilesByFolderId(folderId, userId) {
  return await executeWithPrisma(async (prisma) => {
    const files = await prisma.file.findMany({
      where: {
        folderId: folderId,
        userId: userId,
      },
    });
    return files;
  });
}

async function getFileById(id) {
  return await executeWithPrisma(async (prisma) => {
    const file = await prisma.file.findUnique({
      where: {
        id: id,
      },
    });
    return file;
  });
}

async function deleteFileById(fileId) {
  return await executeWithPrisma(async (prisma) => {
    await prisma.file.delete({
      where: {
        id: fileId,
      },
    });
  });
}

module.exports = {
  getUserByUsername,
  createNewUser,
  createNewFolder,
  getAllFolders,
  getFolderById,
  getFoldersByParentId,
  deleteFolder,
  renameFolder,
  createNewFile,
  getFileById,
  getFilesByFolderId,
  deleteFileById,
};
