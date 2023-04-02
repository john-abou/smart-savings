import React from "react";
import { useStoreContext } from "../../../contexts/GlobalContext";
import { CLEAR_CART } from "../../../utils/actions";
import './style.css';

export default function CartItem({ product }) {
  
  const [state, dispatch] = useStoreContext();
  
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
