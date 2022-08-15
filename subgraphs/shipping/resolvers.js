const { allShipping } = require('../data.json');
const resolvers = {
  Query: {
    shippingInformation: (_, args) => {
      console.log('[shipping-subgraph][Query][shippingInformation] args => ', args)
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
    __resolveReference: (reference) => {
      console.log('[shipping-subgraph][Shipping][__resolveReference] reference => ', reference)
      const shippingInfo = allShipping.find(s => s.id === reference.id);
      console.log('[shipping-subgraph][Shipping][__resolveReference] shippingInfo',shippingInfo)
      shippingInfo.userAddress = reference.user;
      
      return shippingInfo
    },
    product: (parent) => {
      // The server can infer product.id without this resolver. Which component does this and what are the rules?
      console.log('[shipping-subgraph][Shipping][product] => ', parent.product)
      return { id: parent.product.id }
    },
    user(parent) {
      console.log('[shipping-subgraph][Shipping][user] => ', parent.user)
      return { id: parent.user }
    },
    // uses @requires and fetches data from User
    deliveryInstructions: (shippingInfo) => {
      console.log('[shipping-subgraph][Shipping][deliveryInstructions] shippingInfo => ', shippingInfo)
      const street = shippingInfo.userAddress.address.street1;
      const stateCode = shippingInfo.userAddress.address.stateCode;
      let computerField = `Drop package at street ${street}`
      computerField += `with state code ${stateCode}`;
      
      return computerField;
    }
  },
  Product: {
    shippingEstimate(product) {
      console.log('[shipping-subgraph][Product][shippingEstimate] => ', product)
      const dimensions = product.dimensions;
      return `computeShippingEstimate(id: ${product.id}, size: ${dimensions.size}, weight; ${dimensions.weight})`;
    }
  }
};

module.exports = resolvers;
