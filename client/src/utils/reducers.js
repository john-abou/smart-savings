/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  UPDATE_USERS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
  ADD_TO_INVENTORY,
  INVENTORY_CHECK,
  REMOVE_FROM_INVENTORY
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    case UPDATE_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
        products: state.products.map((product) => {
          if (product._id === action.product._id) {
            return {
              ...product,
              inCart: true,
            };
          }
          return product;
        }),
      };
    case UPDATE_CART_QUANTITY:
      console.log('======================', state);
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseCount = action.purchaseCount
            product.quantity = action.quantity
          }
          return product;
        }),
      };
    case INVENTORY_CHECK:
      // Find the item clicked from the products array. Determine if the current quantity is 0.
      // If the current quantity is 0, set product.inStock = false, otherwise it should be set to true
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === action._id) {
            if (product.quantity === 0) {
              return {
                ...product,
                inStock: false
              };
            } else {
              return {
                ...product,
                inStock: true
              };
            }
          }
          return product;
        }),
      };
    case ADD_TO_INVENTORY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === action._id) {
            return {
              ...product,
              quantity: action.quantity,
              inStock: true
            };
          }
          return product;
        }),
      };
    case REMOVE_FROM_INVENTORY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product._id === action._id) {
            return {
              ...product,
              quantity: action.quantity,
            };
          }
          return product;
        }),
      };
    case CLEAR_CART:
      // From the current state, remove the cart item that was clicked on.
      // Update the cartOpen status to `true` if the cart is not empty.
      // Update the product quantity, it should be the original quantity before the item was added to the cart.
      let newCartState = state.cart.filter((product) => {
        return product._id !== action._id;
      });
      return {
        ...state,
        cartOpen: newCartState.length > 0,
        cart: newCartState,
        products: state.products.map((product) => {
          if (product._id === action._id) {
            return {
              ...product,
              quantity: action.quantity,
              inCart: false,
            };
          }
          return product;
        }),
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    default:
      return state;
  }
};

export const useProductReducer = (initialState) => {
  return useReducer(reducer, initialState);
};


/* 



*/