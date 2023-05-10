import React, {useEffect} from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { ADD_TO_CART, TOGGLE_CART, UPDATE_CART_QUANTITY, CLEAR_CART, ADD_TO_INVENTORY, REMOVE_FROM_INVENTORY, INVENTORY_CHECK } from '../../../utils/actions';
import { Link } from 'react-router-dom';
import './style.css';

export default function ProductItem({ product }) {
  const { name, description, price, quantity, image, _id } = product;
  const [state, dispatch] = useStoreContext();
  
  // Make a function to truncate text
  const truncateText = (text, maxlength) => {
    return (text.length > maxlength) ?
    text.slice(0, maxlength - 1) + '…' : text;
  }

  // Vars for breakpoints
  const isMobile = window.innerWidth < 576;
  const isLessThanLargeBkpt = window.innerWidth < 1200;

  return (
    <div className='col-md-6 col-xl-4 col-xxl-3 my-2'>
      <div className='card' style={{height: '500px'}}>
        <div className='card-title'>
          <Link to={`/products/${_id}`}>
            <h5 className='card-title'>{isLessThanLargeBkpt ? (isMobile ? truncateText(description, 20) : truncateText(name, 35)) : truncateText(name, 25)}</h5>
          </Link>
        </div>
        <div className='card-body'>
          <p className='card-desc'>{isLessThanLargeBkpt ? (isMobile ? truncateText(description, 120) : truncateText(description, 150) ) : truncateText(description, 100)}</p>
          <div className='image-container'>
            <img src={image} width="150" height="150" alt={`${name}`}></img>
            <p className='card-price'>CAD: ${price}</p>
          </div>
        </div>
        <div className='card-footer'>
          <small className='text-muted'>Inventory: {quantity} </small>
        </div>
      </div>
    </div>
  );  
}
