// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
dotenv.config();
const gateway = new ApolloGateway({
    debug: true
});
async function startApolloServer() {
    const app = express();
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer, enabling our servers to shut down gracefully.
    const httpServer = http.createServer(app);
    // Same ApolloServer initialization as before, plus the drain plugin for our httpServer.
    const server = new ApolloServer({
        gateway,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    // Set up our Express middleware to handle CORS, body parsing, and our expressMiddleware function.
    app.use('/', cors({ origin: ['https://www.your-app.example', 'https://studio.apollographql.com'] }), bodyParser.json(), 
    // expressMiddleware accepts the same arguments: an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.authorization || '';
            const user = token; // getUser(token); - TODO implement role services
            if (!user)
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            return { user };
        },
    }));
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);
}
startApolloServer();
