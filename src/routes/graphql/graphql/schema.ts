import { GraphQLSchema } from 'graphql';
import { Query } from './queries.js';
import { Mutation } from './mutations.js';

export const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
  });