import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserById(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log(err);
  }
}

async function addUser(name, balance) {
  try {
    const newUser = {
      name: name,
      balance: balance,
    };
    const user = await prisma.user.create({
      data: newUser,
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(name, balance, userId) {
  try {
    const newUser = {
      name: name,
      balance: balance,
    };

   const user =  await prisma.user.update({
        where: { id: userId },
        data: newUser,
      });
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(userId) {
  try {
   const user = await prisma.user.delete({
      where: {
        id:userId,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}

export { getUserById, getAllUsers, addUser, deleteUser, updateUser };
