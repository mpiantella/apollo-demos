const goals = require('./goals.json');

const resolvers = {
  Query: {
    goal: (root, args, context, info) => {
      return goals.find(u => u.id == args.id);
    },
    goals: (root, args, context, info) => {
      return goals;
    }
  },
  Goals: {
    __resolveReference: (reference) => {
      console.log('[goals-sub][Goals][__resolveReference] reference :', reference);
      return goals.find(u => u.id == reference.id);
    }
  },
};

module.exports = resolvers;
