const { shipping } = require('../data.json');

const resolvers = {
  Query: {
    allShipping: (_, args, context) => {
      return shipping;
    },
    shippingInfo: (_, args, context) => {
      return shipping.find(s => s.id == args.id);
    }
  },
  Shipping: {
    __resolveReference: (reference) => {
      console.log('[shipping-sub][Shipping][__resolveReference] reference :\n', reference);
      return shipping.find(s => s.id == reference.id);
    },
    product: (parent) => {
      console.log('[shipping-sub][Shipping][product] parent :\n', parent);
      return { id: parent.product };
    }
  },
  Product: {
    __resolveReference: (reference) => {
      console.log('[shipping-sub][Product][__resolveReference] reference :\n', reference);
      return {
        id: reference.productId
      }
    },
  }
};

module.exports = resolvers;