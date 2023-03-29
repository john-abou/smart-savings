import React, { useEffect } from 'react';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import CartItem from '../CartItem';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';

// Import useQuery and useMutation hooks from @apollo/client
// import reducers from '../../utils/reducers';
// Import query and mutation functions from utils/queries.js and utils/mutations.js
// Import CartItem component from components/CartItem.js

export default function CartContainer() {
  // Create state variables for cart data and cartOpen
  // Create state variables for mutations
  // Create a function to toggle the cartOpen state
  // Create a function to add items to the cart
  // Create a function to remove items from the cart
  // Create a function to calculate the total price of items in the cart
  // Create a function to update a product's quantity in the cart
  // Create a function to send the cart data to the server
  // Create a function to clear the cart
  // Create a function to handle changes in quantity input
  // Create a function to handle form submission
  // Create a function to handle closing the cart
  // Create a function to handle removing an item from the cart
  // Create a function to handle updating an item's quantity in the cart
  const [state, dispatch] = useStoreContext();
  const { cart } = state;
  const cartOpen = state.cartOpen;
  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };
  const calculateTotal = () => {
    let sum = 0;
    for (const item of cart) {
      sum += item.price * item.purchaseQuantity;
    }
    return sum.toFixed(2);
  }

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
          {cart.map(item => (
            <CartItem
              key={item._id}
              item={item}
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