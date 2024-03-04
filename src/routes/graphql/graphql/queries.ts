import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import { UserType, ProfileType, PostType, MemberTypeEnum, MemberType } from './types.js';
import { getUserById, getAllUsers } from './db/user.js';
import { getProfileById, getAllProfiles } from './db/profile.js';
import { getPostById, getAllPosts } from './db/post.js';
import { getMemberTypeById, getAllMemberTypes } from './db/memberType.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const user = await getUserById(args.id);
        return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      async resolve() {
        const users = await getAllUsers();
        return users;
      },
    },
    profile: {
      type: ProfileType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const profile = await getProfileById(args.id);
        return profile;
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      async resolve() {
        const profiles = await getAllProfiles();
        return profiles;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const post = await getPostById(args.id);
        return post;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      async resolve() {
        const posts = await getAllPosts();
        return posts;
      },
    },
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeEnum } },
      async resolve(_, args) {
        let memberTypeId = 'basic';
        switch (args.id) {
          case 'basic':
            memberTypeId = 'basic';
            break;
          case 'business':
            memberTypeId = 'business';
            break;
        }
        const memberType = await getMemberTypeById(memberTypeId);
        return memberType;
      },
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      async resolve() {
        const memberTypes = await getAllMemberTypes();
        return memberTypes;
      },
    },
  }),
});

export { Query };
