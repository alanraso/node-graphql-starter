import * as dotenv from 'dotenv';
import { GraphQLServer, Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';

const envFileName = process.env.TEST === 'true' ? '.env.test' : '.env';
dotenv.config( { path: `${__dirname}/../${envFileName}` });

const serverConfig: Options = {
  port: process.env.PORT || 3000,
};

const typeDefs = `
  type Query {
    Hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    Hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

export async function startServer() {
  console.info('Connecting to Database...');
  await createConnection();
  console.info('Connected!!\n');

  console.info('Starting GraphQL server...');
  await server.start(serverConfig);
  console.info(`Server is listening on port ${serverConfig.port}!!\n`)
}
