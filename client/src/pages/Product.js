/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PRODUCT } from '../utils/queries';

import PriceChart from '../components/User/PriceChart/priceHistoryChart';

export default function ProductPage() {

  const { id } = useParams();

  console.log(id)

  const [newproduct, setNewProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [AmazonPriceHistory, setAmazonPriceHistory] = useState([]);
  const [WalmartPriceHistory, setWalmartPriceHistory] = useState([]);
  const [LoblawsPriceHistory, setLoblawsPriceHistory] = useState([]);

  const { data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { id },
  })

  useEffect(() => {
    if (data && data.getProductById.AmazonHistory.priceHistory) {
      setAmazonPriceHistory(data.getProductById.AmazonHistory.priceHistory);
      setWalmartPriceHistory(data.getProductById.WalmartHistory.priceHistory);
      setLoblawsPriceHistory(data.getProductById.LoblawsHistory.priceHistory);
      setIsLoading(false)
    }
  }, [data]);

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
      <div className="d-flex">
        <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{ margin: '20px' }}>
          <img src={newproduct.image} className="mx-auto d-block" width="500" height="500" />
          <button className="btn btn-primary w-100 mt-3">Add to Cart</button>
        </div>
        <div className="p-3" >
          <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{ margin: '20px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 'bold' }}>{newproduct.name}</h1>
          <hr style={{ width: '100%', height: '2px', backgroundColor: 'black', border: 'none', margin: '1rem 0' }} />
            <p className="mb-4">{newproduct.description}</p>
            <div className="d-flex flex-row justify-content-center align-items-center mb-4">
              <h2 className="mr-3">Price: ${newproduct.price} </h2>
            </div>
            <p>Quantity: {newproduct.quantity}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
            <div style={{ margin: '0 10px' }}>
              <PriceChart key={newproduct._id} priceHistory={AmazonPriceHistory} comp="Amazon" lineColour="orange" />
            </div>
            <div style={{ margin: '0 10px' }}>
              <PriceChart key={newproduct._id} priceHistory={WalmartPriceHistory} comp="Walmart" lineColour="blue" />
            </div>
            <div style={{ margin: '0 10px' }}>
              <PriceChart key={newproduct._id} priceHistory={LoblawsPriceHistory} comp="Loblaws" lineColour="red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}