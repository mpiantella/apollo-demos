const accounts = require('./accounts.json');

const resolvers = {
  Account: {
    __resolveReference: (reference) => {
      return accounts.find((a) => a.id == reference.id);
    }
  },
  Customer: {
    accounts: (customer) => {
      console.log(`[resolvers][Customer] accounts ${JSON.stringify(accounts)}`);
      const accountPerCustomerId = accounts.filter((a) => a.customerId == customer.id);
      return accountPerCustomerId;
    },
    insights: (customer) => {
      const insights = [];
      accounts.map(a => {
        const advice = (a.balance < 100) ? ' check daily on your expenses!' : ' think about investing.'
        insights.push(`For ${customer.name} account ${a.name}, you should ${advice}`)
      });
    
      return insights;
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
