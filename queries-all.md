# Queries by Subgraphs and entity relationship

## Accounts
```
query Account {
  account(id: "1") {
    id
    name
    type
    balance
    number
    institutionName
    customerId
  }
  accounts {
    id
    name
    type
    balance
    number
    institutionName
    customerId
  }
}
```
## Customer
```
query Customer {
  customer(id: "customer-1") {
    id
    name
    address {
      street1
      street2
      city
      stateCode
      zipCode
    }
    # contributed field from Accounts subgraph
    accounts {
      id
      name
      type
      balance
      number
      institutionName
      customerId
    }
  }
  customers {
    id
    accounts {
      id
      name
      type
      balance
      number
      institutionName
      customerId
    }
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
```
## Goals
```
query Goals {
  goal(id: "goal-1") {
    id
    type
    name
    startDate
    endDate
    targetAmount
    savedAmount
    latestGoalProgress {
      score
      asOfDate
      confidenceLevel
    }
  }
  goals {
    id
    type
    name
    startDate
    endDate
    targetAmount
    savedAmount
    latestGoalProgress {
      score
      asOfDate
      confidenceLevel
    }
  }
}

```
## Goal Progress
```
query GoalProgress {
  goalProgress(goalId: "goal-1") {
    goal {
      id
      type
      productCode
      totalAnnualContribution
      currentAssetMix
    }
    progresses {
      score
      asOfDate
      confidenceLevel
    }
  }
  goalProgresses {
    goal {
      id
      type
      productCode
      totalAnnualContribution
      currentAssetMix
    }
    progresses {
      score
      asOfDate
      confidenceLevel
    }
  }
}
```
## Product
```
query Product {
  product(id: "1") {
    id
    name
    description
    dimensions {
      size
      weight
    }
  }
  products {
    id
    name
    description
    dimensions {
      size
      weight
    }
  } 
}
```

## Shipping
```
query Shipping {
  shipping(id: "1") {
    id
    __typename
    deliveryInstructions
  }
}
```