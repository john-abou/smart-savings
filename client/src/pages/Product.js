import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCT } from '../utils/queries';
import Product from '../components/Product';
// import components later
// import hook to get global state later
// import apollo queries later 

export default function ProductPage() {
  // Define state,dispatch from global state hook

  const product = {
    name: 'Product Name',
    description: 'Product Description',
    price: 100,
    image: 'https://via.placeholder.com/150',
    quantity: 10,
    category: 'Category 1'
  }
  // Destructure state from global state hook

  // Define query to load the product from the database  

  return (
    <div>
      { /* Render 1 component based on id */ }
      <Product  data={product}/>
    </div>
  );
}