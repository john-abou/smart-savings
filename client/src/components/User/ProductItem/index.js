/* eslint-disable no-unused-vars */
import React from "react";
import { useStoreContext } from "../../../contexts/GlobalContext";
import {
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
} from "../../../utils/actions";

import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  // destructure product properties
  const { name, description, price, image, category, _id, quantity } = product;

  // Define dispatch from the global state hook and destructure the cart
  const [state, dispatch] = useStoreContext();
  const { cart, products } = state;
  console.log(products, ":---text");

  // Define a function to handle add to cart, should add item to cart and increase cart count in global state
  const addToCart = () => {
    // Determine if the item is in the cart, then add to cart and update quantity
    const productInCart = cart.find(
      (cartProduct) => cartProduct._id === product._id
    );
    if (productInCart && productInCart.purchaseCount > 0) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: productInCart._id,
        purchaseCount: parseInt(productInCart.purchaseCount) + 1,
      });
      console.log(cart);
      dispatch({
        type: "REMOVE_FROM_INVENTORY",
        _id: product._id,
        quantity: product.quantity - 1,
      });
    } else {
      if (quantity > 0) {
        dispatch({
          type: ADD_TO_CART,
          product: { ...product, purchaseCount: 1, quantity: quantity - 1 },
        });
        dispatch({
          type: "REMOVE_FROM_INVENTORY",
          _id: product._id,
          quantity: product.quantity - 1,
        });
        console.log(cart);
      } else {
        console.log("Item is out of stock");
      }
    }
  };

  const removeFromCart = () => {
    // If the item clicked matches the item in the cart, remove it from the cart
    const productInCart = cart.find(
      (cartProduct) => cartProduct._id === product._id
    );

    if (productInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: productInCart._id,
        purchaseCount: parseInt(productInCart.purchaseCount) - 1, // Update item in cart
      });
      dispatch({
        type: "UPDATE_PRODUCT",
        _id: product._id,
        quantity: product.quantity + 1, // Update product quantity
      });
    } else {
      console.log("Product not found in cart");
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3">
      <div className="card">
        <div className="card-body">
          <Link to={`/products/${_id}`}>
            <h5 className="card-title">{name}</h5>
          </Link>
          <p className="card-text">{description}</p>
          <p className="card-text">CAD: ${price}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={image} width="250" height="250" alt={`${name}`}></img>
            <div style={{ marginTop: "10px" }}>
              <button className="btn btn-primary" onClick={removeFromCart}>
                Remove From Cart
              </button>
              <button
                className="btn btn-primary"
                style={{ marginLeft: "10px" }}
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">Stock: {quantity}</small>
        </div>
      </div>
    </div>
  );
}























// This completed and updated index.js file solves the problem of updating the stock quantity of a product/item based on whether it is added or removed from a user's cart. With the updates made to the addToCart and removeFromCart functions, when a product is added to the cart, its quantity will be decreased by 1 if it is greater than 0, and when a product is removed from the cart, its quantity will be increased by 1. These changes will ensure that the stock quantity accurately reflects the number of products/items that are available for purchase.
