import React, {useEffect} from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { ADD_TO_CART, TOGGLE_CART, UPDATE_CART_QUANTITY, CLEAR_CART, ADD_TO_INVENTORY, REMOVE_FROM_INVENTORY, INVENTORY_CHECK } from '../../../utils/actions';
import { Link } from 'react-router-dom';
import Auth from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function ProductItem({ product }) {
  const { name, description, price, quantity, inStock, inCart, image, _id } = product;
  const [state, dispatch] = useStoreContext();
  const { cart, cartOpen } = state;

  const navigate = useNavigate();

  const addToCart = () => {
    // If the user is not logged in, redirect them to the login page
    if (!Auth.loggedIn()) {
      navigate('/login');
      return;
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
        <div className='card-title'>
          <Link to={`/products/${_id}`}>
            <h5 className='card-title'>{isLessThanLargeBkpt ? (isMobile ? truncateText(description, 20) : truncateText(name, 35)) : truncateText(name, 25)}</h5>
          </Link>
        </div>
        <div className='card-body'>
          <p className='card-desc'>{isLessThanLargeBkpt ? (isMobile ? truncateText(description, 120) : truncateText(description, 150) ) : truncateText(description, 100)}</p>
          <div className='image-container'>
            <img src={image} width="150" height="150" alt={`${name}`}></img>
            <p className='card-price'>CAD: ${price}</p>
            <div className='w-100 text-center'>
              <button className='btn btn-primary w-30' style={inCart ? {display: 'inline-block', backgroundColor: '#FE7E67', borderColor: '#fbfbfb', marginRight: '10px'} : {display: 'none'} } onClick={removeFromCart}>Remove</button>
              <button className='btn btn-primary w-30' style={inCart ? {marginleft: '10px', backgroundColor: '#07689F'} : { marginLeft: "0", backgroundColor: '#07689F' }} onClick={addToCart} disabled={!inStock}>Add to Cart</button>
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
