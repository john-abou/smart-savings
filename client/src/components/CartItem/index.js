import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../contexts/GlobalContext";

// Import delete mutation and query to get all cart items

export default function CartItem({ item }) {
  // Define state,dispatch from global state hook
  const [state, dispatch] = useStoreContext();
  // Destructure state from global state hook
  const { cart } = state;
  // Define Mutations for user -- addToCart, updateCartAmount

  // Define a function to handle add to cart, should add item to cart and increase cart count
  const removeFromCart = () => {
    // Define mutation for removing from
    // Use apollo client to execute mutation
    // Use dispatch to update global state
  };

  return (
    <div className="flex-row">
      <div>
        <img src=""></img>
      </div>  
      <div>
        {item.name}, {item.purchaseQuantity} @ ${item.price}
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
