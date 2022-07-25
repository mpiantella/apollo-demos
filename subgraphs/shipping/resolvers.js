const { allShipping } = require('../data.json');
const resolvers = {
  Query: {
    shippingInformation: (_, args) => {
      console.log("[shipping-subgraph][shippingInformation] args =>", args)
      return allShipping.find(s => s.id === args.id)
    },
    inStockCount: (_, args) => {
      return allShipping.find(s => s.id === args.shippingId);
    }
  },
  InStockCount: {
    product: (root) => {
      return {
        id: root.product.id,
        description: root.product.description
      }
    }
  },
  Shipping: {
    product: (parent) => {
      // The server can infer product.id without this resolver. Which component does this and what are the rules?
      console.log("[shipping-subgraph][Shipping][product] =>", parent.product)
      return { id: parent.product.id }
    }
  },
  Product: {
    shippingEstimate(product) {
      console.log("[shipping-subgraph][Product][shippingEstimate] =>", product)
      const dimensions = product.dimensions;
      return `computeShippingEstimate(id: ${product.id}, size: ${dimensions.size}, weight; ${dimensions.weight})`;
    }
  }
};

module.exports = resolvers;
