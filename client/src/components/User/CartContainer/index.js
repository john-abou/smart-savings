import React, { useReducer } from 'react';
import { reducer } from '../../../utils/reducers'
import { useStoreContext } from '../../../contexts/GlobalContext';
import CartItem from '../CartItem';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../../utils/actions';

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
  const initialState = useStoreContext();
  const [state, dispatch] = useReducer(reducer, initialState)
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