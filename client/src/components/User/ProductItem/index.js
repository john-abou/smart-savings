import React from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, CLEAR_CART, ADD_TO_INVENTORY, REMOVE_FROM_INVENTORY, INVENTORY_CHECK } from '../../../utils/actions';
import { Link } from 'react-router-dom';
import Auth from '../../../utils/auth';

export default function ProductItem({ product }) {
  // destructure product properties
  const { name, description, price, quantity, inStock, inCart, image, _id } = product;

  // Define dispatch from the global state hook and destructure the cart
  const [state, dispatch] = useStoreContext();
  const { cart } = state;



  const addToCart = () => {
    // If the user is not logged in, redirect them to the login page
    if (!Auth.loggedIn()) {
      document.location.assign('/login');
    }

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
    dispatch({
      type: INVENTORY_CHECK,
      _id: product._id
    })
  }

  const removeFromCart = () => {
    // If the item clicked matches the item in the cart, remove 1 from the purchase count and add 1 to the product quantity
    // If the purchase count is 1, remove the item from the cart
    const productInCart = cart.find( (cartProduct) => cartProduct._id === product._id);
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
    <div className='col-sm-12 col-md-6 col-lg-4 my-3'>
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
              <button className='btn btn-primary' onClick={removeFromCart} disabled={!inCart} >Remove From Cart</button>
              <button className='btn btn-primary' style={{ marginLeft: "10px" }} onClick={addToCart} disabled={!inStock}>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className='card-footer'>
          <small className='text-muted'>Inventory: {quantity} </small>
          {!inStock ? (
            <small className='text-muted' style={{ marginLeft: "10px" }}>Out of Stock</small>
          ) : (
            <small className='text-muted' style={{ marginLeft: "10px" }}></small>
          )}
        </div>
      </div>
    </div>
  );
}
