import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProfileById(profileId) {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
    });
    return profile;
  } catch (err) {
    console.log(err);
  }
}

async function getAllProfiles() {
  try {
    const profiles = await prisma.profile.findMany();
    return profiles;
  } catch (err) {
    console.log(err);
  }
}

async function getProfileByUserId(userId) {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId
      }
    });
    return profile;
  } catch (err) {
    console.log(err);
  }
}

async function getAllProfilesById(profileId) {
  try {
    const profiles = await prisma.profile.findMany({
      where: {
        memberTypeId: profileId
      }
    });
    return profiles;
  } catch (err) {
    console.log(err);
  }
}

async function addProfile(isMale, yearOfBirth, userId, memberTypeId) {
  try {
    const newProfile = {
      isMale: isMale,
      yearOfBirth: yearOfBirth,
      memberTypeId: memberTypeId,
      userId: userId,
    };
    
    const profile = await prisma.profile.create({
      data: newProfile,
    });
    return profile;
  } catch (err) {
    console.log(err);
  }
}

async function updateProfile(isMale, yearOfBirth, userId, memberTypeId, profileId) {
  try {
    const newProfile = {
      isMale: isMale,
      yearOfBirth: yearOfBirth,
      memberTypeId: memberTypeId,
      userId: userId,
    };
    
    const profile = await prisma.profile.update({
      where: { id: profileId },
      data: newProfile,
    });
    return profile;
  } catch (err) {
    console.log(err);
  }
}

async function deleteProfile(profileId) {
  try {
    
    const profile =  await prisma.profile.delete({
      where: {
        id: profileId
      },
    });
    return profile;
  } catch (err) {
    console.log(err);
  }
}

export { getProfileById, getAllProfiles, addProfile,getAllProfilesById, deleteProfile, updateProfile, getProfileByUserId };
