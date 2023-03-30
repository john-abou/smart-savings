import React, { useReducer } from 'react';
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
    // const itemInCart = cart.find((item) => item._id === product._id)

    // if (itemInCart) {
    //   dispatch({
    //     type: UPDATE_CART_AMOUNT,
    //     _id: product._id,
    //     purchaseQuantity: parseInt(product.quantity) + 1
    //   })
    // }
    // dispatch({
    //   type: ADD_TO_CART,
    //   product: { ...product, purchaseQuantity: 1 }
    // });

    cart.forEach(item => {
      console.log('item_id:', item._id);
      console.log('prop_id', product._id);
      console.log('if test: ', item._id === product._id);
      if (item._id === product._id) {
        // If the item is in the cart, update the cart quantity
        console.log('made it inside the if block')
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: product._id,
          purchaseQuantity: parseInt(item.purchaseQuantity) + 1
        });
        // Exit the function
        return;
      }
    });

    console.log("before adding: ", cart);
    // If the item is not in the cart, add it to the cart
    dispatch({
      type: ADD_TO_CART,
      product: { ...product, purchaseQuantity: 1 }
    });
    console.log("after adding: ", cart);
  }

  const removeFromCart = () => {
    // Remove the item from the cart
    dispatch({
      type: REMOVE_FROM_CART,
      _id: product._id
    });
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