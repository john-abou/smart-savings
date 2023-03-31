import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../../utils/queries';

import ProductItem from '../ProductItem';



export default function ProductContainer() {

  const [newproducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data && data.products) {
      setNewProducts(data.products);
      setIsLoading(false)
    }
  }, [data]);

  return (
    <section id='products' className='container-fluid'>
      <div className='row'>
        {
          newproducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        }
      </div>
    </section>
  );
}