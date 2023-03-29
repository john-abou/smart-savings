import React from 'react';
// import { Link } from 'react-router-dom';
// import components later
// import hook to get global state later
// import apollo queries later 

export default function ProductItem( { product } ) {
  const { name, description, price, image, quantity, category } = product;
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
    <div className='col-sm-12 col-md-6 col-lg-3'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
          <p className='card-text'>$CAD: {price}</p>
          <img src={image}></img>
          <button className='btn btn-primary' onClick={addToCart}>Add to Cart</button>
        </div>
        <div className='card-footer'>
          <small className='text-muted'>Stock: {quantity}</small>
          <small className='text-muted'>Category: {category}</small>
        </div>
      </div>
    </div>
  );
}