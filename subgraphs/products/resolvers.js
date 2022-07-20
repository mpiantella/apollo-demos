const { products } = require('../data.json');

const resolvers = {
  Product: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      console.log('[product-sub][Product][__resolveReference] reference :\n', reference);
      return products.find(p => p.id == reference.id);
    }
  },
  Query: {
    products: (_, args, context) => {
      return products;
    },
    product: (_, args, context) => {
      return products.find(p => p.id == args.id);
    }
  },
};

module.exports = resolvers;
