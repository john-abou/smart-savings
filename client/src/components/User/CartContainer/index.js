import React, { useState, useEffect } from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { TOGGLE_CART } from '../../../utils/actions';
import { QUERY_CHECKOUT } from '../../../utils/queries';
import Dropdown from 'react-bootstrap/Dropdown';
import CartItem from '../CartItem';
import './style.css';

const stripePromise = loadStripe('pk_test_51N8755L91T6XpsIhDN5lpeEWMKRo3F22geFa7XjgZ5C02355JIatuJsMeeLJRpMjwlaIznXZbQvgK2wxz9j9yjUz003GwtylaG');

export default function CartContainer() {  
  const [state, dispatch] = useStoreContext();
  const { cart, cartOpen } = state;


  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    console.log('useEffect data', data)
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);


  const [width, setWidth] = useState(window.innerWidth);

  // When the window is resized, update the width state
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  // Define a boolean to determine if the cart is less than 992 px wide
  let isMobile = width < 992;

  // Toggle the cart open or closed
  const toggleCart = () => {
    if (cartOpen === false) {
      dispatch({ type: TOGGLE_CART });
    }
  };

  const closeCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  // Loop through the cart array and add up the price of each item multiplied by the purchase quantity
  const calculateTotal = () => {
    let sum = 0;
    for (const product of cart) {
      sum += product.price * product.purchaseCount;
    }
    return sum.toFixed(2);
  }

  // When the checkout button is clicked, use the cart data to create a new order in the database
  const submitCheckout = async () => {

    const productIDs = [];

    // Loop through the cart array and push the _id of each item into the productIDs array
    for (const product of cart) {
      productIDs.push(product._id);
    }

    console.log('product IDs:', productIDs)

    // Use the getCheckout query to create a new order in the database
    getCheckout({
      variables: { products: productIDs }
    });
  };
 
  return (
    <div>
      <Dropdown className="custom-dropdown" show={cartOpen} onToggle={toggleCart}>
        <Dropdown.Toggle id="dropdown-basic">
          Cart <span id='cart-emoji'>🛒</span> 
        </Dropdown.Toggle>
        <Dropdown.Menu align={isMobile ? 'end' : 'start'} >
          <div className='close-btn' onClick={closeCart}>
            <p className='text-end'>Close</p>
          </div>
          {cart.length ? (
            <div>
              {cart.map(product => (
                  <CartItem
                    key={product._id}
                    product={product}
                    />
                ))}
            </div>
          ) : (
              <h3 className='text-center mt-3 mb-5'>Your cart is empty.</h3>
          )}
              <div className="d-flex mt-4 justify-content-around align-items-center mb-2">
                <strong >Total: ${calculateTotal()}</strong>
                <button className='btn btn-dark' onClick={submitCheckout}>Checkout</button>
              </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}