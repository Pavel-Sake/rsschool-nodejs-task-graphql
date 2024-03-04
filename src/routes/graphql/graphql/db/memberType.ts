import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getMemberTypeById(memberTypeId) {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id: memberTypeId,
    },
  });

  return memberType;
}

async function getAllMemberTypes() {
  const memberType = await prisma.memberType.findMany();

  return memberType;
}

export { getMemberTypeById, getAllMemberTypes };
