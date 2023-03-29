import React from 'react';
import { Link } from 'react-router-dom';
// import components later
// import hook to get global state later
// import apollo queries later 

export default function Product(item) {
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
      <div classNameName='card'>
        <div className='card-body'>
          <h5 className='card-title'>{item.name}</h5>
          <p className='card-text'>{item.description}</p>
          <p className='card-text'>{item.price}</p>
          <button className='btn btn-primary' onClick={addToCart}>Add to Cart</button>
          <img src={item.image}></img>
        </div>
        <div className='card-footer'>
          <small className='text-muted'>Stock: {item.quantity}</small>
          <small className='text-muted'>Category: {item.category}</small>
        </div>
      </div>
    </div>
  );
}