const customers = require('./customers.json');

const resolvers = {
  Customer: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      console.log('[customer-sub][Customer][__resolveReference] reference :', reference);
      return customers.find(u => u.id == reference.id);
    }
  },
  Query: {
    customer: (root, args, context, info) => {
      return customers.find(u => u.id == args.id);
    },
    customers: (root, args, context, info) => {
      return customers;
    }
  },
  Mutation: {
    createCustomer(parent, { input }) {
      const newCustomer = {
        id: "customer-" + Math.floor(Math.random() * 100),
        name: input.name,
        profile: input.profile || 'default',
        address: input.address
      };
      customers.push(newCustomer);
      return newCustomer;
    },
  }
};

module.exports = resolvers;
