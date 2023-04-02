import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PRODUCT } from '../../utils/queries';

import { useMutation } from '@apollo/client';
import { UPDATE_ITEM } from '../../utils/mutations';
import { UPDATE_COMP_PRICE_HISTORY } from '../../utils/mutations';

import PriceChart from '../.././components/User/PriceChart/priceHistoryChart';

export default function ProductPage() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState();
    const [productId, setProductId] = useState('');

    const [errors, setErrors] = useState(null);

    const [updateProduct] = useMutation(UPDATE_ITEM);
    const [updateCompetitorPriceHistory] = useMutation(UPDATE_COMP_PRICE_HISTORY);

    const { id } = useParams();

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
            setProductId(data.getProductById._id)
        }
    }, [data]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateProduct({ variables: { name, description, price, quantity, productId } });
            // Set global state with user data
            console.log('User data:', data);
            window.location.replace(`/products/admin/${productId}`)
        } catch (error) {
            setErrors(error.message);
        }
    };

    // handleInputChange function to update state based on form input changes 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'price') {
            setPrice(value);
        } else if (name === 'quantity') {
            setQuantity(parseInt(value));
        }
    };

    const updateCompPrice = async (productId) => {
        try {
            setIsLoading(true);
            await updateCompetitorPriceHistory({ variables: { productId } });
            window.location.replace(`/products/admin/${productId}`);
        } catch (error) {
            console.error(error);
            alert('Failed to update competitor prices. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='row'>
            <div className='row'>
                <div className="d-flex">
                    <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{ margin: '20px' }}>
                        <img src={newproduct.image} className="mx-auto d-block" width="500" height="500" />
                        <div className='text-center' key={newproduct.id} style={{ margin: '20px' }}>
                            <button className='btn btn-primary' type='button' onClick={() => updateCompPrice(newproduct._id)} disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Scrape Competitor Prices'}
                            </button>
                        </div>
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
            <div className="container" style={{ margin: '20px' }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Edit Product</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={price}
                                    onChange={handleInputChange}
                                    inputMode="numeric"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    value={quantity}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors && <div className="alert alert-danger">{errors}</div>}
                            <button type="submit" className="btn btn-primary btn-block mt-4">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}