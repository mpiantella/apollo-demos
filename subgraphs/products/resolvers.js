const products = require('./products.json');

const resolvers = {
  Product: {
    __resolveReference: (reference) => {
      console.log('[product-sub][Product][__resolveReference] reference :\n', reference);
      return products.find(p => p.id == reference.id);
    },
  },
  Customer: {
    purchaseHistoryPerProfile(customer) {
      let purchasedItemsPerProfile = [];
      products.map((p) => {
        const matched = p.purchasedBy.filter((c) => c.id === customer.id && c.profile === customer.profile);
        if(matched.length > 0) {
          purchasedItemsPerProfile.push(p)
        }
      });
      return purchasedItemsPerProfile;
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
