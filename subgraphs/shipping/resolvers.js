const shippingInfo = {}
const resolvers = {
  Query: {
    shippingInfo: (_, __) => {
      return {
        id: 1,
        orderNumber: 2020
      };
    }
  },
  Shipping: {
    __resolveReference: (reference) => {
      return {
        id: 2,
        orderNumber:3030
      }
    },
    shippingEstimate: (parent) => {
      return {
        shippingEstimate: `parent.size: ${parent.size} - parent.weight: ${parent.weight}`
      }
    }
  }
};

module.exports = resolvers;
