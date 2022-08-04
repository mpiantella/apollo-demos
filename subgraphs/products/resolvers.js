const { products } = require("../data.json");

const resolvers = {
  Product: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      console.log(
        "[product-sub][Product][__resolveReference] reference :\n",
        reference
      );
      return { id: reference.id };
    },
  },
  Query: {
    products: (_, args, context) => {
      return products;
    },
    product: (_, args, context) => {
      return products.find((p) => p.id == args.id);
    },
  },
  Shipping: {
    // this is called by the gateway when reviews requests location
    __resolveReference: (reference) => {
      console.log(
        "[product-sub][Shipping][__resolveReference] reference :\n",
        reference
      );
      return { id: reference.id };
    },
    product: (root) => {
      console.log("[product-sub][Shipping][product] :\n", root);
      return products.find((p) => p.id == root.id);
    },
  },
};

module.exports = resolvers;
