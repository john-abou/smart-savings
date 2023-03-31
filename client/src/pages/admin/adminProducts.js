// Import React
import React, { useState, useEffect, useReducer } from 'react';
// Import statemanagement hooks and reducers/actions
import { useStoreContext } from '../../contexts/GlobalContext';
import { UPDATE_PRODUCTS } from '../../utils/actions';
// Import apollo hooks and queries
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';

import { useMutation } from '@apollo/client';
import { DELETE_ITEM } from '../../utils/mutations';

import { Link } from 'react-router-dom';



export default function ProductContainer() {
  const [state, dispatch] = useStoreContext();
  const [productId, setProductId] = useState('');

  const [deleteProduct] = useMutation(DELETE_ITEM);

  const { data }  = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    } else {
      console.log('No data found');
    }
  }, [data, dispatch]);

  const deleteitem = async (productId) => {
    await deleteProduct({ variables: { productId } });
    window.location.replace(`/admin/products`)
  }

  return (
    <section id='products' className='container-fluid'>
      <div className='row'>
        {
          state.products.map((product) => (
            <div className='col-sm-12 col-md-6 col-lg-3' key={product.id}>
            <div className='card'>
              <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                <p className='card-text'>{product.description}</p>
                <p className='card-text'>CAD: ${product.price}</p>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <img src={product.image} width="250" height="250"></img>
                  <div style={{ marginTop: "10px" }}>
                    <Link to={`/products/admin/${product._id}`}>
                    <button className='btn btn-primary'>Edit Product</button>
                    </Link>
                    <button className='btn btn-primary' style={{ marginLeft: "10px" }} onClick={ () => deleteitem(product._id)}>Delete Product</button>
                  </div>
                </div>
              </div>
              <div className='card-footer'>
                <small className='text-muted'>Stock: {product.quantity}</small>
                <small className='text-muted' style={{ marginLeft: "10px" }} >Category: {product.category}</small>
              </div>
            </div>
          </div>
          ))
        }
      </div>
    </section>
  );
}