import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import Product from '../Product';

export default function ProductContainer() {
  const products = [{
    name: 'Product 1',
    description: 'Product 1 description',
    price: 10,
    image: 'https://via.placeholder.com/150',
    quantity: 10,
    category: 'Category 1'
  },
  {
    name: 'Product 2',
    description: 'Product 2 description',
    price: 20,
    image: 'https://via.placeholder.com/150',
    quantity: 20,
    category: 'Category 2'
  }];

  return (
    <section id='products'>
      { /* Render 1 component based on id */ }
      <Product items={products}/>
    </section>
  );
  }