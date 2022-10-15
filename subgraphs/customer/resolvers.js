const { isCompositeType } = require('graphql');
const { customers } = require('../data.json');

const resolvers = {
  Query: {
    customer: (root, args, context, info) => {
      return customers.find(u => u.id == args.id);
    },
    customers: (root, args, context, info) => {
      return customers;
    }
  },
  Customer: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      console.log('[customer-sub][Customer][__resolveReference] reference :', reference);
      return customers.find(u => u.id == reference.id);
    }
  },
};

module.exports = resolvers;
