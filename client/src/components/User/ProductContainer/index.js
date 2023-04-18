import React, { useEffect } from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { UPDATE_PRODUCTS } from '../../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../../utils/queries';
import ProductItem from '../ProductItem';


export default function ProductContainer() {
  const [state, dispatch] = useStoreContext();

  const { data }  = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data && state.products.length === 0) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    } else {
      console.log('No data found');
    }
  }, [data, dispatch]);

  return (
    <section id='products' className='container-fluid'>
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