const shippingInfo = {}
const resolvers = {
  Query: {
    shippingInfo: (_, __) => {
      return ;
    }
  },
  Shipping: {
    // TODO: self resolver
    shippingEstimate: (parent) => {
      return dataSources.reviewsAPI.getReviewsForLocation(id);
    }
  }
};

module.exports = resolvers;
