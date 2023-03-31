/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PRODUCT } from '../utils/queries';


import ProductItem from '../components/User/ProductItem';
// import components later
// import hook to get global state later
// import apollo queries later 

export default function ProductPage() {
  // Define state,dispatch from global state hook

  const { id } = useParams();

  console.log(id)

  const [newproduct, setNewProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { id },
  })

  useEffect(() => {
    if (data && data.getProductById) {
      setNewProduct(data.getProductById);
      setIsLoading(false)
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      console.log(newproduct);
    }
  }, [newproduct]);

  return (
    <div className='row'>
      <div>
        <img src={newproduct.image} className="mx-auto d-block" width="500" height="500"></img>
      </div>
      <div className='text-center' >
        <h1>{newproduct.name}</h1>
        <p>{newproduct.description}</p>
        <p>Price: CAD ${newproduct.price}</p>
        <p>Quantity: {newproduct.quantity}</p>
        <button className='btn btn-primary'>Add to Cart</button>
      </div>
    </div>
  );
}