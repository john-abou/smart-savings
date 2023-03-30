import React from 'react';
import Navbar from '../../components/Navbar';
import ProductContainer from '../../components/User/ProductContainer';

export default function UserHome() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to your Dashboard</h1>
      <p>View and manage your account information and purchase history.</p>
      <ProductContainer />
    </div>
  );
}
