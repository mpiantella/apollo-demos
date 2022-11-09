require('./open-telemetry');

const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const port = 5010;
const subgraphName = 'customer';

const typeDefs = gql(
  readFileSync(`${__dirname}/schema.graphql`, 'UTF-8')
);
const resolvers = require('./resolvers');

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  context({ req }) {
    console.log('Headers passed by Router: ', JSON.stringify(req.headers, null, 2));
    let currentUser = null;
    if (req.headers['authorization']) {
      currentUser = {
        user1: 'maria',
        id: 1
      };
    }
    return {
      currentUser
    };
    // throw new Error('Sending back an error from accounts subgraph')
  }
});


server
  .listen({ port })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch(err => {
    console.error(err);
  });
