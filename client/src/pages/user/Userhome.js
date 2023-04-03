import React from 'react';
import ProductContainer from '../../components/User/ProductContainer';
import CartContainer from '../../components/User/CartContainer'

export default function UserHome() {
  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Welcome to your Dashboard</h1>
        <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>View and manage your account information and purchase history.</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '2rem' }}>
        <ProductContainer />
        <CartContainer />
      </div>
    </div>
  );  
}