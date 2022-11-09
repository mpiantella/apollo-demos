require('./open-telemetry');

const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')

const provider = new NodeTracerProvider();
const consoleExporter = new ConsoleSpanExporter();
const spanProcessor = new SimpleSpanProcessor(consoleExporter);
provider.addSpanProcessor(spanProcessor);
provider.register()

const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
  serviceName: 'accounts-service'
});

const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
provider.addSpanProcessor(zipkinProcessor)
// test

const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const port = 5040;
const subgraphName = 'accounts';

const typeDefs = gql(
  readFileSync(`${__dirname}/schema.graphql`, 'UTF-8')
);

const resolvers = require('./resolvers');

function getUser(header, token) {
  console.log(`This would do a fancy call to a security system: Header: ${header}, token: ${token}`)
  return {
    user1: 'maria',
    id: 1
  };
}

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  context({ req }) {

    console.log('Headers passed by Router: ', JSON.stringify(req.headers, null, 2));
    let currentUser = null;
    if (req.headers['upstream-header-authorization']) {
      currentUser = getUser(
        req.headers['upstream-header-authorization'],
          "graphqlyall"
        );
    }
    return {
      currentUser
    };
    // throw new Error('Sending back an error from accounts subgraph')
  }
});

server
  .listen({ port })
  .then(({ url }) => { console.log(`🚀 Subgraph ${subgraphName} running at ${url}`); })
  .catch(err => {
    console.error(err);
  });
