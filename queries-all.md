## Subgraph queries
```
# profile subgraph
query {
  user(id: "user-1"){
    id
    name
    address {
      street1
      street2
      city
      stateCode
      zipCode
    }
  }
  users {
    id
    name
     address {
      street1
      street2
      city
      stateCode
      zipCode
    }
  }
}
# products subgraph
query ($productId: ID!) {
  product(id: $productId) {
    id
    title
    url
    description
    dimensions {
      size
      weight
    }
  }
  products {
    id
    title
    url
    description
    dimensions {
      size
      weight
    }
  }
}
# shipping subgraph
query ShippingInfo {
  shippingInfo {
    id
    orderNumber
  }
}
```
