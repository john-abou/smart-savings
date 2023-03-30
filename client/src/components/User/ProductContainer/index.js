import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../../utils/queries';

import ProductItem from '../ProductItem';



export default function ProductContainer() {

  const [showProducts, setShowProducts] = useState(); 

  const  { data }  = useQuery(QUERY_ALL_PRODUCTS);

  console.log(data);

  useEffect(() => {
  const products = data?.products || [];
  
  console.log(products);

  setShowProducts(products);

  //console.log(typeof (products))
  },[data]);

  /*   const products = [
    {
      _id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10,
      image: 'https://via.placeholder.com/150',
      quantity: 10,
      category: 'Category 1'
    },{
      _id: 2,
      name: 'Product 2',
      description: 'Product 2 description',
      price: 20,
      image: 'https://via.placeholder.com/150',
      quantity: 20,
      category: 'Category 2'
    },{
      _id: 3,
      name: 'Product 3',
      description: 'Product 3 description',
      price: 30,
      image: 'https://via.placeholder.com/150',
      quantity: 30,
      category: 'Category 3'
    },{
      _id: 4,
      name: 'Product 4',
      description: 'Product 4 description',
      price: 40,
      image: 'https://via.placeholder.com/150',
      quantity: 40,
      category: 'Category 4'
    },{
      _id: 5,
      name: 'Product 5',
      description: 'Product 5 description',
      price: 50,
      image: 'https://via.placeholder.com/150',
      quantity: 50,
      category: 'Category 5'
    }
  ]; */

  return (
    <section id='products' className='container-fluid'>
      <div className='row'>
        {
          showProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        }
      </div>
    </section>
  );
}