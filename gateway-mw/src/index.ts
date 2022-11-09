// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import { GraphQLError } from 'graphql';

dotenv.config();

interface MyContext {
  token?: String;
}

const gateway = new ApolloGateway({
  debug: true
});

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    gateway,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
      // ApolloServerPluginCacheControl({ calculateHttpHeaders: false }),
      {
        async requestDidStart() {
          return {
            async willSendResponse(requestContext) {
              const { response, overallCachePolicy } = requestContext;
              const policyIfCacheable = overallCachePolicy.policyIfCacheable();
              if (policyIfCacheable && !response.headers && response.http) {
                response.http.headers.set(
                  'cache-control',
                  // ... or the values your CDN recommends
                  `max-age=0, s-maxage=${overallCachePolicy.maxAge
                  }, ${policyIfCacheable.scope.toLowerCase()}`,
                );
              }
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({ origin: ['http://localhost:4000', 'https://studio.apollographql.com'] }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';

        const user = token;// getUser(token); - TODO implement role services
        if (!user)
          throw new GraphQLError('User is not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });

        return { user };
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startApolloServer()
