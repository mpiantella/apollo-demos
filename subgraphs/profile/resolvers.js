const { isCompositeType } = require("graphql");
const { users } = require("../data.json");

const resolvers = {
  Query: {
    user: (root, args, context, info) => {
      return users.find((u) => u.id == args.id);
    },
    users: (root, args, context, info) => {
      return users;
    },
  },
  Shipping: {
    __resolveReference: (reference) => {
      console.log(
        "[profile-sub][Shipping][__resolveReference] reference :",
        reference
      );
      return { userId: reference.userId };
    },
    user: (root) => {
      console.log("[profile-sub][Shipping][user]: ", root);

      const user = users.find((e) => e.id === root.userId);

      return user;
    },
  },
  User: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      console.log(
        "[profile-sub][User][__resolveReference] reference :",
        reference
      );
      return { id: reference.id };
    },
    address: (root) => {
      console.log("[profile-sub][User][address] root: ", root);

      const add = users.find((u) => u.id == root.id).address;

      return add;
    },
  },
};

module.exports = resolvers;
