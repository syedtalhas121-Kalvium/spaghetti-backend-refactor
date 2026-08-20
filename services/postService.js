const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
}

async function getPostById(id) {
  return prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
}

async function findAuthorById(id) {
  return prisma.user.findUnique({ where: { id } });
}

async function createPost({ title, content, authorId }) {
  return prisma.post.create({
    data: { title, content, authorId, published: false },
  });
}

async function publishPost(id) {
  return prisma.post.update({
    where: { id },
    data: { published: true },
  });
}

module.exports = {
  getPublishedPosts,
  getPostById,
  findAuthorById,
  createPost,
  publishPost,
};
