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
    <div className="container my-3">
      <div className="row">
        <div className="col-2 me-2">
          <img className='cart-img' src={product.image} alt='product'></img>
        </div>  
        <div className="col-8">
          {product.name},  <strong>${product.price}</strong> x {product.purchaseCount}
        </div>
        <div className='ms-sm-3 ms-md-4 col-1'>
          <span
            role="img"
            aria-label="X icon"
            onClick={clearCart}
          >
            ❌
          </span>
        </div>
      </div>
    </div>
  );
}
