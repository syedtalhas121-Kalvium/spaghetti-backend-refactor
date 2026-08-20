const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getActiveUsers() {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: { posts: true },
  });
  return users.map((user) => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }));
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
  return user ? { ...user, fullName: `${user.firstName} ${user.lastName}` } : null;
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function createUser({ firstName, lastName, email }) {
  return prisma.user.create({
    data: { firstName, lastName, email, isActive: true },
  });
}

async function deactivateUser(id) {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
}

module.exports = {
  getActiveUsers,
  getUserById,
  findUserByEmail,
  createUser,
  deactivateUser,
};
