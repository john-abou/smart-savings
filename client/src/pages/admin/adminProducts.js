import React, { useState, useEffect } from 'react';
import { useStoreContext } from '../../contexts/GlobalContext';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { DELETE_ITEM } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import ProductItem from '../../components/admin/ProductItem';

export default function ProductContainer() {
  const [state, dispatch] = useStoreContext();

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

  const handleAdd= async () => {
    window.location.replace(`/admin/products/add`)
  }

  const deleteitem = async (productId) => {
    await deleteProduct({ variables: { productId } });
    window.location.replace(`/admin/products`)
  }

  return (
  <section id='products' className='container-fluid'>
    <div className='text-center my-4'>
      <Link to='/admin/products/add'>
      <button className='btn btn-primary' style={{backgroundColor: '#07689F'}} onClick={handleAdd}>Add Product</button>
      </Link>
    </div>
    <div className='row'>
    {
      state.products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))
    }
    </div>
  </section>
);
}
