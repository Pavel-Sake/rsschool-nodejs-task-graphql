import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLInt, GraphQLID } from 'graphql';
import { UserType, ProfileType, MemberTypeEnum, PostType } from './types.js';
import { addUser, deleteUser, updateUser } from './db/user.js';
import { addProfile, deleteProfile, updateProfile } from './db/profile.js';
import { createPost, updatePost, deletePost } from './db/post.js';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
      },
      async resolve(parent, args) {
        const user = await addUser(args.name, args.balance);
        return user;
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
      },
      async resolve(parent, args) {
        const user = await updateUser(args.name, args.balance, args.id);
        return user;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_, args) {
        const user = await deleteUser(args.id)
        return user;
      },
    },
    createProfile: {
      type: ProfileType,
      args: {
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeEnum },
        userId: { type: GraphQLString },
      },
      async resolve(_, args) {
        let memberTypeId = 'basic';
        switch (args.memberTypeId) {
          case 'basic':
            memberTypeId = 'basic';
            break;
          case 'business':
            memberTypeId = 'business';
            break;
        }

        const profile = await addProfile(args.isMale, args.yearOfBirth, args.userId, memberTypeId);
        return profile;
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: GraphQLID },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeEnum },
        userId: { type: GraphQLString },
      },
      async resolve(_, args) {
        let memberTypeId = 'basic';
        switch (args.memberTypeId) {
          case 'basic':
            memberTypeId = 'basic';
            break;
          case 'business':
            memberTypeId = 'business';
            break;
        }

        const profile = await updateProfile(args.isMale, args.yearOfBirth, args.userId, memberTypeId, args.id);
        return profile;
      },

    },
    deleteProfile: {
      type: ProfileType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(_, args) {
        const profile = await deleteProfile(args.id)
        return profile;
      },
    },
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const user = await createPost(args.title, args.content, args.authorId);
        return user;
      },
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const user = await updatePost(args.title, args.content, args.authorId, args.id);
        return user;
      },

    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const user = await deletePost(args.id);
        return user;
      },
    }
  }),
});

export { Mutation };