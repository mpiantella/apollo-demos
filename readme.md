# Store

## Dev Set up

```
# install subgraphs & gateway deps
cd subgraphs/products && npm i 
cd subgraphs/profile && npm i 
cd subgraphs/shipping && npm i
cd gateway/shipping && npm i 

# start the subgraphs
npm run start:dev

# 🚀 Subgraph profile running at http://localhost:5010/
# 🚀 Subgraph products running at http://localhost:5020/
# 🚀 Subgraph shipping running at http://localhost:5030/

# exportAPOLLO_KEY=service:SECRET
# start the gateway
npm run start:gw
# 🚀 Gateway ready at http://localhost:4000/
```

![Desired State](fed-2-requires.png)

## Desired State

```
# shipping subgraph
query {
  shippingInfo {
    id
    orderNumber
    shippingEstimate # query planner calls profile & products
  }
}
```

Sample schema definition, utilizing [@requires](https://www.apollographql.com/docs/federation/entities-advanced#using-requires-with-object-subfields).

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
