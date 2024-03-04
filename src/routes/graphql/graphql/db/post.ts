import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getPostById(postId) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    return post;
  } catch (err) {
    console.log(err);
  }
}

async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (err) {
    console.log(err);
  }
}

async function getAllPostsById(authorId) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
      },
    });
    return posts;
  } catch (err) {
    console.log(err);
  }
}

async function createPost(title, content, authorId) {
  const newPost = {
    title: title,
    content: content,
    authorId: authorId,
  };
  try {
    const posts = await prisma.post.create({
      data: newPost,
    });
    return posts;
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(title, content, authorId, postId) {
  const newPost = {
    title: title,
    content: content,
    authorId: authorId,
  };
  try {
    const posts = await prisma.post.update({
      where: { id: postId },
      data: newPost,
    });
    return posts;
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(postId) {
  try {
    const posts = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return posts;
  } catch (err) {
    console.log(err);
  }
}

export { getPostById, getAllPosts, getAllPostsById, createPost, updatePost, deletePost };
