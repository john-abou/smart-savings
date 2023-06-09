import { gql } from '@apollo/client';

// LOGIN - This mutation logs in a user with the given email and password. It returns a token and the user's ID
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// ADD_ORDER - This mutation adds an order to the logged in user's order history. It takes an array of product IDs and returns the purchase date and a list of products with their _id, name, description, price, quantity, and image
export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

// ADD_USER - This mutation adds a new user to the database. It takes firstName, lastName, email, and password as arguments and returns a token and the user's ID
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// ADD_TO_CART - This mutation adds a product to the logged in user's cart. It takes a product ID and returns the user's ID, first name, last name, and a list of products in the cart with their _id, name, description, price, quantity, image, and category
export const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!) {
    addToCart(productId: $productId) {
      _id
      token
      firstName
      lastName
      cart {
        _id
        name
        description
        price
        quantity
        image
        category {
          _id
          name
        }
      }
    }
  }
`;

// REMOVE_FROM_CART - This mutation removes a product from the logged in user's cart. It takes a product ID and returns the user's ID, first name, last name, and a list of products in the cart with their _id, name, description, price, quantity, image, and category
export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: ID!) {
    removeFromCart(productId: $productId) {
      _id
      token
      firstName
      lastName
      cart {
        _id
        name
        description
        price
        quantity
        image
        category {
          _id
          name
        }
      }
    }
  }
`;

// CREATE_ORDER - This mutation creates an order. It takes an array of product IDs and returns the order's ID, purchase date, and a list of products with their _id, name, description, price, quantity, image, and category
export const CREATE_ORDER = gql`
  mutation createOrder($products: [ID]!) {
    createOrder(products: $products) {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        image
        category {
          _id
          name
        }
      }
    }
  }
`;

// UPDATE_ORDER - This mutation updates an order's status. It takes an order ID and returns the order's ID, purchase date, a list of products with their _id, name, description, price, quantity, image, and category, and the order's status
export const UPDATE_ORDER = gql`
  mutation updateOrder($orderId: ID!) {
    updateOrder(orderId: $orderId) {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        image
        category {
          _id
          name
        }
      }
      status
    }
  }
`;

// UPDATE_USER - This mutation updates a user's information. It takes firstName, lastName, isAdmin as arguments and returns all user information
export const UPDATE_USER = gql`
mutation UpdateUser($_id: ID!, $isAdmin: Boolean!) {
  updateUser(_id: $_id, isAdmin: $isAdmin) {
    _id
    firstName
    lastName
    email
    admin
  }
}
`; 

export const UPDATE_ITEM = gql`
mutation Mutation($name: String, $description: String, $price: String, $quantity: Int, $productId: ID!) {
  updateProduct(name: $name, description: $description, price: $price, quantity: $quantity, productId: $productId) {
    name
    description
    price
    quantity
  }
}
`;

export const DELETE_ITEM = gql`
mutation Mutation($productId: ID!) {
  deleteProduct(productId: $productId) {
    name
    description
    price
  }
}
`;

export const UPDATE_COMP_PRICE_HISTORY = gql`
mutation Mutation($productId: ID!) {
  appendCompetitiorPriceHistory(productId: $productId) {
    AmazonHistory {
      priceHistory {
        price
        date
      }
    }
    WalmartHistory {
      priceHistory {
        price
        date
      }
    }
    LoblawsHistory {
      priceHistory {
        price
        date
      }
    }
  }
}
`;

export const ADD_PRODUCT = gql`
mutation Mutation($name: String!, $price: String!) {
  addProduct(name: $name, price: $price) {
    name
    price
  }
}
`;