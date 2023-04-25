import React from 'react';
import ProductContainer from '../../components/User/ProductContainer';
import CartContainer from '../../components/User/CartContainer'
import bazaar from '../../images/bazaar.png'
import './style.css'

export default function UserHome() {
  const isMobile = window.innerWidth < 576;
  const isXLargeScreen = window.innerWidth < 1200;
  const isLargeScreen = window.innerWidth < 992;
  const isMediumScreen = window.innerWidth < 768;
  return (
    <div style={isMobile ? {padding: '1rem 2rem 2rem'} : { padding: '1rem 5rem 2rem'}}>
      <div className='bazaar-img d-flex justify-content-center align-items-center' style={{height: '300px'}}>
        <img src={bazaar} style={!isXLargeScreen ? {width: '40%'} : (!isLargeScreen ? {width: '60%'} : (!isMediumScreen ? {width: '70%'} : {width: '100%', height:'70%'}))}></img>
      </div>
      <hr></hr>
      <div style={{marginTop: '4rem'}}>
        <ProductContainer />
      </div>
    </div>
  );  
}