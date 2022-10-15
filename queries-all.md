## Subgraph queries
```
# customer subgraph
query {
  customer(id: "customer-1"){
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
  customers {
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

## Customer with accounts 

```
query Customer($customerId: ID!) {
  customer(id: $customerId) {
    id
    name
    address {
      street1
      street2
      city
      stateCode
      zipCode
    }
    accounts {
      id
      name
      type
      number
      balance
      institutionName
      customerId
    }
  }
}
```
