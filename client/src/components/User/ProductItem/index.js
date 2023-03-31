import React, { useReducer, useEffect } from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { reducer } from '../../../utils/reducers';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, REMOVE_FROM_CART } from '../../../utils/actions';

export default function ProductItem( { product } ) {
  // destructure product properties
  const { name, description, price, image, quantity, category } = product;

  // Define dispatch from the global state hook and destructure the cart
  const initialState = useStoreContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cart } = state;

  // Define a function to handle add to cart, should add item to cart and increase cart count in global state
  const addToCart = () => { 
    // Determine if the item is in the cart, then add to cart and update quantity
    const productInCart = cart.find( (cartProduct) => cartProduct._id === product._id);
    console.log(productInCart);
    if (productInCart && productInCart.purchaseCount > 0) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: productInCart._id,
        purchaseCount: parseInt(productInCart.purchaseCount) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...product, purchaseCount: 1 }
      });
    }
    // state.product.quantity--;
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const removeFromCart = () => {
    // If the item clicked matches the item in the cart, remove it from the cart
    const productInCart = cart.find( (cartProduct) => cartProduct._id === product._id);
    console.log(productInCart);
    if (productInCart.purchaseCount === 1) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: productInCart._id
      });
    } else {
      console.log('Item in cart:', parseInt(productInCart.purchaseCount) - 1);
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: productInCart._id,
        purchaseCount: parseInt(productInCart.purchaseCount) - 1 // Update item in cart
      });
    }
  }


  return (
    <div className='col-sm-12 col-md-6 col-lg-3'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
          <p className='card-text'>$CAD: {price}</p>
          <img src={image}></img>
          <button className='btn btn-primary' onClick={removeFromCart}>Remove From Cart</button>
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