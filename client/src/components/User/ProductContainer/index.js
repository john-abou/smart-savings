// Import React
import React, { useEffect, useReducer } from 'react';
// Import statemanagement hooks and reducers/actions
import { useStoreContext } from '../../../contexts/GlobalContext';
import { reducer } from '../../../utils/reducers';
import { UPDATE_PRODUCTS } from '../../../utils/actions';
// Import apollo hooks and queries
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../../utils/queries';
// Import ProductItem component
import ProductItem from '../ProductItem';



export default function ProductContainer() {
  const [state, dispatch] = useStoreContext();

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