import React, {useState} from 'react'
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from '../../utils/mutations';

export default function AdminAddProductPage () {
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState();

  const [errors, setErrors] = useState(null);

  const [addProduct] = useMutation(ADD_ITEM);

  const [isLoading, setIsLoading] = useState(true);

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
          const { data } = await addProduct({ variables: { name, description, price, quantity } });
          // Set global state with user data
          console.log('User data:', data);
          window.location.replace(`/admin/products`)
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

  return(
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
  )
}