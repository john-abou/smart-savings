import React, {useEffect} from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, CLEAR_CART, ADD_TO_INVENTORY, REMOVE_FROM_INVENTORY } from '../../../utils/actions';

import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
  // destructure product properties
  const { name, description, price, quantity, image, _id } = product;

  // Define dispatch from the global state hook and destructure the cart
  const [state, dispatch] = useStoreContext();
  const { cart, products } = state;
  console.log('cart', cart)

  // Define a function to handle add to cart, should add item to cart and increase cart count in global state
  const addToCart = () => {
    // Determine if the item is in the cart, then add to cart and update quantity
    const productInCart = cart.find( (cartProduct) => cartProduct._id === product._id);
    if (productInCart && productInCart.purchaseCount > 0) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: productInCart._id,
        purchaseCount: parseInt(productInCart.purchaseCount) + 1
      });
      console.log(cart)
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...product, purchaseCount: 1 }
      });
    }
    dispatch({
      type: REMOVE_FROM_INVENTORY,
      _id: product._id,
      quantity: parseInt(product.quantity) - 1
    })
  }

  const removeFromCart = () => {
    // If the item clicked matches the item in the cart, remove 1 from the purchase count and add 1 to the product quantity
    // If the purchase count is 0, do nothing
    const productInCart = cart.find( (cartProduct) => cartProduct._id === product._id);
    if (productInCart === undefined) {
      console.log('Error: Cannot remove item from cart');
    } else {
      if (productInCart.purchaseCount > 1) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: productInCart._id,
          purchaseCount: parseInt(productInCart.purchaseCount) - 1
        });
        dispatch({
          type: ADD_TO_INVENTORY,
          _id: product._id,
          quantity: parseInt(product.quantity) + 1
        })
        console.log(cart)
      } else {
        dispatch({
          type: CLEAR_CART,
          _id: product._id
        });
        dispatch({
          type: ADD_TO_INVENTORY,
          _id: product._id,
          quantity: parseInt(product.quantity) + 1
        })
      }
    }
  }

  const displayRemoveButton = () => {
    // If the item is in the cart, update the style of the button to display
    const productInCart = cart.find( (cartProduct) => cartProduct._id === product._id);
    if (productInCart) {
      return 'btn btn-primary'
    } else {
      return 'btn btn-primary disabled'
    }
  }

  return (
    <div className='col-sm-12 col-md-6 col-lg-3'>
      <div className='card'>
        <div className='card-body'>
          <Link to={`/products/${_id}`}>
            <h5 className='card-title'>{name}</h5>
          </Link>
          <p className='card-text'>{description}</p>
          <p className='card-text'>CAD: ${price}</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={image} width="250" height="250" alt={`${name}`}></img>
            <div style={{ marginTop: "10px" }}>
              <button className='btn btn-primary' onClick={removeFromCart}  >Remove From Cart</button>
              <button className='btn btn-primary' style={{ marginLeft: "10px" }} onClick={addToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className='card-footer'>
          <small className='text-muted'>Stock: {quantity}</small>
        </div>
      </div>
    </div>
  );
}
