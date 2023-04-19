import React from 'react';
import ProductContainer from '../../components/User/ProductContainer';
import CartContainer from '../../components/User/CartContainer'

export default function UserHome() {
  const isMobile = window.innerWidth < 576;
  return (
    <div style={isMobile ? {padding: '1rem 2rem 2rem'} : { padding: '1rem 5rem 2rem'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Home Essentials for Less</h1>
      </div>
      <hr></hr>
      <div style={{marginTop: '4rem'}}>
        <ProductContainer />
        <CartContainer />
      </div>
    </div>
  );  
}