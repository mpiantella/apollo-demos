const { users } = require('../data.json');

const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return users.find(u => u.id == args.id);
    },
    users: (root, args, context, info) => {
      return users;
    }
  },
  User: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      console.log('[profile-sub][User][__resolveReference] reference :\n', reference);
      return users.find( u => u.id == reference.id);
    }
  },
};

module.exports = resolvers;
