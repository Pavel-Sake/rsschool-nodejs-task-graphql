import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate, Source } from 'graphql';
import { schema } from './graphql/schema.js';
import depthLimit from 'graphql-depth-limit';

const MAX_QUERY_DEPTH = 5; /* Your desired depth limit */

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      // validate(schema, parse(new Source(query)), [depthLimit(5)]);

      // 1. Parse the GraphQL query
      const parsedQuery = parse(new Source(query));

      // 2. Validate the query with depth limit
      const validationErrors = validate(schema, parsedQuery, [depthLimit(MAX_QUERY_DEPTH)]);

      if (validationErrors.length > 0) {
        // Handle validation errors (e.g., return a 400 Bad Request response)
        console.error('GraphQL validation errors:', validationErrors);
        return {
          statusCode: 400,
          error: 'Bad Request: Invalid GraphQL query',
        };
      }

      try {
        const result = await graphql({
          schema,
          source: query,
          contextValue: {},
          variableValues: variables,
        });

        return {
          data: result.data,
        };
      } catch (err) {
        return {
          statusCode: 500,
          error: 'Internal Server Error',
        };
      }
    },
  });
};

export default plugin;
