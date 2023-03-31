import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PRODUCT } from '../../utils/queries';

import { useMutation } from '@apollo/client';
import { UPDATE_ITEM } from '../../utils/mutations';

// import components later
// import hook to get global state later
// import apollo queries later 

export default function ProductPage() {
    // Define state,dispatch from global state hook

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState();
    const [productId, setProductId] = useState('');

    const [errors, setErrors] = useState(null);

    const [updateProduct] = useMutation(UPDATE_ITEM);

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
            setProductId(data.getProductById._id)
        }
    }, [data]);

    useEffect(() => {
        if (!isLoading) {
            console.log(newproduct);
        }
    }, [newproduct]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    try {
        console.log(price)
        console.log(productId)
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
        } else if (name === 'Price') {
            setPrice(value);
        } else if (name === 'quantity') {
            setQuantity(parseInt(value));
        }
    };

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
            </div>
            <h2 className='text-center' >Edit Product</h2>
            <form onSubmit={handleFormSubmit} className='text-center'>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input
                        type="description"
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="Price">Price: </label>
                    <input
                        type="Price"
                        id="Price"
                        name="Price"
                        value={price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="quantity"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={handleInputChange}
                    />
                </div>
                {errors && <p>{errors}</p>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
}