import React from "react";
import { useStoreContext } from "../../../contexts/GlobalContext";
import { UPDATE_CART_QUANTITY, REMOVE_FROM_CART } from "../../../utils/actions";

// Import delete mutation and query to get all cart items

export default function CartItem({ product }) {
  // Define state,dispatch from global state hook
  const [state, dispatch] = useStoreContext();
  // Define Mutations for user -- addToCart, updateCartAmount
  

  // Define a function to handle add to cart, should add item to cart and increase cart count
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: product._id
    })
  };
  
  return (
    <div className="flex-row">
      <div>
        <img src={product.image}></img>
      </div>  
      <div>
        {product.name}, {product.purchaseCount} @ ${product.price}
      </div>
      <div>
        <span
          role="img"
          aria-label="X icon"
          onClick={removeFromCart}
        >
          ❌
        </span>
      </div>
    </div>
  );
}
