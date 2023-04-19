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
      startingInventory: parseInt(product.startingInventory)
    })
  };

  // Make a function to truncate text
  const truncateText = (text, maxlength) => {
    return (text.length > maxlength) ?
    text.slice(0, maxlength - 1) + '…' : text;
  }
  
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-2 me-2">
          <img className='cart-img' src={product.image} alt='product'></img>
        </div>  
        <div className="col-8">
          {truncateText(product.name, 20)},  <strong>${product.price}</strong> x {product.purchaseCount}
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
