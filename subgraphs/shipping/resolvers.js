const shipping = require('./shipping.json');

const resolvers = {
  Query: {
    shipping: (_, args) => {
      console.log('[shipping-subgraph][Query][shipping] args => ', args)
      return shipping.find(s => s.id === args.id)
    },
    // inStockCount: (_, args) => {
    //   return shipping.find(s => s.id === args.shippingId);
    // }
  },
  // InStockCount: {
  //   product: (root) => {
  //     return {
  //       id: root.product.id,
  //       description: root.product.description
  //     }
  //   }
  // },
  Shipping: {
    __resolveReference: (reference) => {
      console.log('[shipping-subgraph][Shipping][__resolveReference] reference => ', reference)
      
      const shippingReference = shipping.find(s => s.id === reference.id);
      shippingReference.customerAddress = reference.customer.address;
      shippingReference.productDimensions = reference.product.dimensions;
      
      return shippingReference
    },
    product: (parent) => {
      console.log('[shipping-subgraph][Shipping][product] => ', parent.product)
      return { id: parent.product }
    },
    customer(parent) {
      console.log('[shipping-subgraph][Shipping][customer] => ', parent.customer)
      return { id: parent.customer }
    },
    deliveryInstructions: (shippingReference) => {
      console.log('[shipping-subgraph][Shipping][deliveryInstructions] shippingReference => ', shippingReference)
      const street = shippingReference.customerAddress.street1;
      const stateCode = shippingReference.customerAddress.stateCode;
      const dimensions = shippingReference.productDimensions;

      let computedField = `Drop package at street ${street}`
      computedField += `with state code ${stateCode}`;
      computedField += `with the following dimensions: size: ${dimensions.size}, weight; ${dimensions.weight})`

      return computedField;
    }
  },
  Product: {
    shippingEstimate(product) {
      console.log('[shipping-subgraph][Product][shippingEstimate] => ', product)
      const dimensions = product.dimensions;
      return {
        message: `Product cost for id: ${product.id}, of dimensions: size: ${dimensions.size}, weight; ${dimensions.weight})`,
        cost: Math.round(dimensions.size/1000 * dimensions.weight / 10.5, 2) // random calculation 
      };
    }
  }
};

module.exports = resolvers;
