import React, { useReducer } from 'react';
import { reducer } from '../../../utils/reducers'
import { useStoreContext } from '../../../contexts/GlobalContext';
import CartItem from '../CartItem';
import { TOGGLE_CART } from '../../../utils/actions';
import './style.css';

export default function CartContainer() {  
  const initialState = useStoreContext();
  const [state, dispatch] = useReducer(reducer, initialState)
  const { cart, cartOpen } = state;

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