const { allShipping } = require("../data.json");
const resolvers = {
  Query: {
    shippingInformation: (_, args) => {
      console.log(
        "[shipping-subgraph][Query][shippingInformation] args => ",
        args
      );
      return allShipping.find((s) => s.id === args.id);
    },
    inStockCount: (_, args) => {
      return allShipping.find((s) => s.id === args.shippingId);
    },
  },
  InStockCount: {
    product: (root) => {
      return {
        id: root.product.id,
        description: root.product.description,
      };
    },
  },
  Shipping: {
    __resolveReference: (reference) => {
      console.log(
        "[shipping-subgraph][Shipping][__resolveReference] reference => ",
        reference
      );
      return { id: reference.id, user: reference.user };
    },
    // uses @requires and fetches data from User
    deliveryInstructions: (parent) => {
      console.log(
        "[shipping-subgraph][Shipping][deliveryInstructions] => ",
        parent
      );
      return `delivery to ${parent.user.address.street1} in ${parent.user.address.stateCode}`;
    },
  },
  Product: {
    shippingEstimate(product) {
      console.log(
        "[shipping-subgraph][Product][shippingEstimate] => ",
        product
      );
      const dimensions = product.dimensions;
      return `computeShippingEstimate(id: ${product.id}, size: ${dimensions.size}, weight; ${dimensions.weight})`;
    },
  },
};

module.exports = resolvers;
