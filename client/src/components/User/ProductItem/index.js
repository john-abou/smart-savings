import React, {useEffect} from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, CLEAR_CART, ADD_TO_INVENTORY, REMOVE_FROM_INVENTORY, INVENTORY_CHECK } from '../../../utils/actions';
import { Link } from 'react-router-dom';
import Auth from '../../../utils/auth';

export default function ProductItem({ product }) {
  const { name, description, price, quantity, inStock, inCart, image, _id } = product;
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
        purchaseCount: parseInt(productInCart.purchaseCount) + 1,
        quantity: parseInt(product.quantity) - 1,
      });
      console.log(cart)
    } else {
      dispatch({
        type: ADD_TO_CART,
        cart: { 
          ...product, 
          purchaseCount: 1, 
          inCart: true,
          quantity: parseInt(product.quantity) - 1,
          startingInventory: parseInt(product.quantity)
        }
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
        purchaseCount: parseInt(productInCart.purchaseCount) - 1,
        quantity: parseInt(product.quantity) + 1
      });
      dispatch({
        type: ADD_TO_INVENTORY,
        _id: product._id,
        quantity: parseInt(product.quantity) + 1
      })
      console.log(cart)
    } else {
      const removeBtn = document.querySelector('remove-hide') 
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
  
  // Make a function to truncate text
  const truncateText = (text, maxlength) => {
    return (text.length > maxlength) ?
    text.slice(0, maxlength - 1) + '…' : text;
  }

  // Vars for breakpoints
  const isMobile = window.innerWidth < 576;
  const isLessThanLargeBkpt = window.innerWidth < 1200;

  return (
    <div className='col-md-6 col-xl-4 col-xxl-3 my-2'>
      <div className='card' style={{height: '500px'}}>
        <div className='card-title mt-2' style={{padding: '0 1rem'}}>
          <Link to={`/products/${_id}`} style={{textDecoration: 'none'}}>
            <h5 className='card-title'>{isLessThanLargeBkpt ? (isMobile ? truncateText(description, 20) : truncateText(name, 35)) : truncateText(name, 25)}</h5>
          </Link>
        </div>
        <div className='card-body d-flex flex-column justify-content-between pt-0' style={{height: '350px', marginBottom: '10px'}}>
          <p className='card-text mb-5' style={{fontSize: '.9rem'}}>{isLessThanLargeBkpt ? (isMobile ? truncateText(description, 120) : truncateText(description, 150) ) : truncateText(description, 100)}</p>
          <div className='d-flex flex-column align-items-center justify-content-end'>
            <img src={image} width="150" height="150" alt={`${name}`}></img>
            <p className='card-text mt-5 mb-0' style={{fontSize: '.9rem'}}>CAD: ${price}</p>
            <div className='w-100 text-center'>
              <button className='btn btn-primary w-30' style={inCart ? {display: 'inline-block', marginRight: '10px'} : {display: 'none'} } onClick={removeFromCart}>Remove</button>
              <button className='btn btn-primary w-30' style={inCart ? {marginleft: '10px'} : { marginLeft: "0" }} onClick={addToCart} disabled={!inStock}>Add to Cart</button>
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
