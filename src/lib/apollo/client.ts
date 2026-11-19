import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema';
import { createResolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: createResolvers(),
});

export const apolloClient = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          developers: {
            keyArgs: ['keyword', 'status'],
            merge: true,
          },
          developer: {
            keyArgs: ['id'],
          },
        },
      },
      Developer: {
        keyFields: ['id'],
      },
    },
  }),
});