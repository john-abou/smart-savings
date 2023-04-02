import React from "react";
import { useStoreContext } from "../../../contexts/GlobalContext";
import { CLEAR_CART } from "../../../utils/actions";
import './style.css';

// Import delete mutation and query to get all cart items

export default function CartItem({ product }) {
  // Define state,dispatch from global state hook
  const [state, dispatch] = useStoreContext();
  // Define Mutations for user -- addToCart, updateCartAmount
  

  // Define a function to handle add to cart, should add item to cart and increase cart count
  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
      _id: product._id,
      quantity: parseInt(product.quantity)
    })
  };
  
  return (
    <div className="flex-row">
      <div>
        <img className='cart-img' src={product.image} alt='product'></img>
      </div>  
      <div>
        {product.name}, {product.purchaseCount} @ ${product.price}
      </div>
      <div>
        <span
          role="img"
          aria-label="X icon"
          onClick={clearCart}
        >
          ❌
        </span>
      </div>
    </div>
  );
}
