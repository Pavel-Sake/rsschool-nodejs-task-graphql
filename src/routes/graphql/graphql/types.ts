import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
} from 'graphql';

import {getAllProfilesById, getProfileByUserId } from './db/profile.js';
import { getAllPostsById } from './db/post.js';
import { getUserById } from './db/user.js';
import { getMemberTypeById } from './db/memberType.js';

const MemberTypeEnum = new GraphQLEnumType({
  name: 'MemberType',
  description: 'One of the episodes from the original Star Wars trilogy',
  values: {
    BASIC: { value: 'basic' },
    BUSINESS: { value: 'business' },
  },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      async resolve(parent, args) {
        const profile = await getProfileByUserId(parent.id);
        return profile;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent) {
        const posts = await getAllPostsById(parent.id);
        return posts;
      },
    },
  }),
});

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: GraphQLString },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: UserType,
      async resolve(parent, args) {
        const user = await getUserById(parent.userId);
        return user;
      },
    },
    userId: { type: GraphQLString },
    memberType: {
      type:MemberType,
      async resolve(parent) {
        const memberType = await getMemberTypeById(parent.memberTypeId)
        return memberType
      }
    },
    memberTypeId: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent) {
        const user = await getUserById(parent.authorId);
        return user;
      },
    },
    authorId: { type: GraphQLString },
  }),
});

const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberTypeEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      async resolve(parent, args) {
        const profiles = await getAllProfilesById(parent.id);
        return profiles;
      },
    },
  }),
});

export { UserType, ProfileType, PostType, MemberTypeEnum, MemberType };
