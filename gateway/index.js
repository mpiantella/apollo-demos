const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const { readFileSync } = require("fs");

const supergraphSdl = readFileSync("../supergraph.graphql").toString();

require("dotenv").config();

const gateway = new ApolloGateway({
  debug: true,
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
