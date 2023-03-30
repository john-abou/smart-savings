import React from 'react';
import Navbar from '../../components/Navbar';
import ProductContainer from '../../components/User/ProductContainer';
import CartContainer from '../../components/User/CartContainer'

export default function UserHome() {
  return (
    <div className='postiion-relative'>
      <Navbar />
      <h1>Welcome to your Dashboard</h1>
      <p>View and manage your account information and purchase history.</p>
      <ProductContainer />
      <CartContainer />
    </div>
  );
}
