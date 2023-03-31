import React, { useReducer } from 'react';
import { reducer } from '../../../utils/reducers'
import { useStoreContext } from '../../../contexts/GlobalContext';
import CartItem from '../CartItem';
import { TOGGLE_CART } from '../../../utils/actions';
import './style.css';

export default function CartContainer() {  
  const [state, dispatch] = useStoreContext();
  const { cart, cartOpen } = state;

  // Toggle the cart open or closed
  const toggleCart = () => {
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
  };

  if (!cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">🛒</span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>[close]</div>
      <h2>Shopping Cart</h2>
      {cart.length ? (
        <div>
          {cart.map(product => (
            <CartItem
              key={product._id}
              product={product}
              />
          ))}
          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>
            <button onClick={submitCheckout}>Checkout </button>
          </div>
        </div>
      ) : (
        <h3>
          Your cart is empty.
        </h3>
      )}
    </div>
  );
}