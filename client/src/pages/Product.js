import React from 'react';
import { Link } from 'react-router-dom';
// import components later
// import hook to get global state later
// import apollo queries later 

function Product() {
  // Define state,dispatch from global state hook
  // Destructure state from global state hook
  // Define Mutations for user -- addToCart, updateCartAmount

  // Define a function to handle add to cart, should add item to cart and increase cart count
  const addToCart = () => {
    // Define mutation for adding to cart
    // Define mutation for updating cart amount
    // Use apollo client to execute mutation
    // Use dispatch to update global state
  }


  return (
    <div>
      {/* Loop through all products and display them */}
      <div class='card'>
        <div class='card-body'>
          <h5 class='card-title'>Product Name</h5>
          <p class='card-text'>Product Description</p>
          <p class='card-text'>Price</p>
          <button class='btn btn-primary' onClick={addToCart}>Add to Cart</button>
          <img></img>
        </div>
      </div>
    </div>
  );
}