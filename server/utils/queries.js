import { gql } from "@apollo/client";

// QUERY_PRODUCTS takes an optional category argument and returns a list of products with their _id, name,description, price, quantity, image, and the _id of their associated category
export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

// QUERY_CHECKOUT takes an array of product _id and returns a Stripe session ID to be used for payment.
export const QUERY_CHECKOUT = gql`
// getCheckout is a mutation, not a query to do a GET request for  data from the server
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

// QUERY_ALL_PRODUCTS returns a list of all products with their _id, name, description, price, quantity, image, and the _id of their associated category
export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

// QUERY_CATEGORIES returns a list of all categories with their _id and name
export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

// QUERY_USER returns information about the logged in user including their firstName, lastName, and a list of their orders. Each order includes its _id, purchaseDate, and a list of products with their _id, name, description, price, quantity, and image
export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
