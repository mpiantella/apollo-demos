const { accounts } = require('../data.json');

const resolvers = {
  Account: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      return accounts.find((a) => a.id == reference.id);
    }
  },
  Customer: {
    // this is called by the gateway when reviews requests location
    accounts: (customer) => {
      const accountPerCustomerId = accounts.filter((a) => a.customerId == customer.id);
      return accountPerCustomerId;
    }
  },
  Query: {
    accounts: (_, args, context) => {
      return accounts;
    },
    account: (_, args, context) => {
      return accounts.find((c) => c.id == args.id);
    }
  }
};

module.exports = resolvers;
