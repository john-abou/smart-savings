import React, {useState} from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import CartItem from '../CartItem';
import { TOGGLE_CART } from '../../../utils/actions';
import './style.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function CartContainer() {  
  const [state, dispatch] = useStoreContext();
  const { cart, cartOpen } = state;

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
    // Functionality to be added.
  };
 
  return (
    <div>
      <Dropdown className="custom-dropdown" show={cartOpen} onToggle={toggleCart}>
        <Dropdown.Toggle variant="outline-primary nav-button mx-2" id="dropdown-basic">
          Cart 
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
                <button className='btn btn-dark' onClick={submitCheckout}>Checkout </button>
              </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}