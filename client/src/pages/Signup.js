import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Signup() {
  // Define initial form state (useState hook)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));
  };

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addUser({
        variables: { ...formData },
      });
      console.log('Signing up - result const: ',result);
      const token = result.data.addUser.token;
      Auth.login(token);
    } catch (error) {
      console.log(error.message);
    }
  };    

  return (
    <div id='signup'>
      <h3 className='mb-4 text-center'>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-1">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            aria-describedby="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            aria-describedby="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className="alert alert-danger">{error.message}</div>}
        <div className='mx-auto text-center'>
          <button type="submit" className='btn btn-primary text-end mt-4 mb-1 col-12 text-center mx-auto' onClick={handleSubmit}>
            Signup
          </button>
          <Link to="/login">← Go to Login</Link>
        </div>
      </form>
    </div>
  );
}
