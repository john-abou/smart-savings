/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  UPDATE_USERS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
  ADD_TO_INVENTORY,
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
      const productIndex = state.products.findIndex(product => product._id === action.product._id);
      if (productIndex !== -1 && state.products[productIndex].quantity > 0) {
        // state.products[productIndex].quantity -= 1;
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, { ...action.product }],
          products: [...state.products],
        };
      }
      return state;
    case ADD_MULTIPLE_TO_CART:
      const newCart = [...state.cart, ...action.products];
      const updatedProducts = state.products.map(product => {
        const cartItem = newCart.find(item => item._id === product._id);
        if (cartItem) {
          product.quantity -= cartItem.quantity;
        }
        return product;
      });
      return {
        ...state,
        cartOpen: true,
        cart: newCart,
        products: updatedProducts,
      };
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map((product) => {
            if (action._id === product.product_id) {
              product.purchaseCount = action.purchaseCount;
            }
            return product;
          }),
        };
      
    case REMOVE_FROM_CART:
      const product = state.products.find(product => product._id === action._id);
      if (product) {
        product.quantity += 1;
      }
      return {
        ...state,
        cartOpen: state.cart.length > 0,
        cart: state.cart.filter((product) => product._id !== action._id),
        products: [...state.products],
      };
    case CLEAR_CART:
      const clearedProducts = state.cart.map(cartItem => {
        const originalProduct = state.products.find(product => product._id === cartItem._id);
        if (originalProduct) {
          originalProduct.quantity += cartItem.quantity;
        }
        return originalProduct;
      });
      return {
        ...state,
        cartOpen: false,
        cart: [],
        products: clearedProducts,
      };
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    case ADD_TO_INVENTORY:
      const productToUpdateIndex = state.products.findIndex(product => product._id === action.product._id);
      if (productToUpdateIndex !== -1) {
        state.products[productToUpdateIndex].quantity += action.quantity;
        return {
          ...state,
          products: [...state.products],
        };
      }
      return state;
    case REMOVE_FROM_INVENTORY:
      const productToUpdate = state.products.find(product => product._id === action._id);
      if (productToUpdate && productToUpdate.quantity >= action.quantity) {
        productToUpdate.quantity -= action.quantity;
        return {
          ...state,
          products: [...state.products],
        };
      }
      return state;
    default:
      return state;
  }
};

export const useProductReducer = (initialState) => {
  return useReducer(reducer, initialState);
};




























// The UPDATE_CART_QUANTITY case in the reducer function handles updating the quantity of a product in the cart. It receives an action with an _id property and a purchaseCount property, and it maps over the products in the cart, updating the purchaseCount of the product with a matching _id. This ensures that the quantity of the product in the cart is accurately reflected.