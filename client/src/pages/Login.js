import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

// Login page component that renders a form to log in a user
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const [loginUser, {error, data}] = useMutation(LOGIN);

  // handleFormSubmit function to execute loginUser mutation and handle errors
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ variables: { email, password } });
      // Define the JWT from the response
      const token = response.data.login.token;
      // Store the JWT in local storage
      Auth.login(token);
    } catch (error) {
      setErrors(error.message);
    }
  };

  // handleInputChange function to update state based on form input changes 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Render the login form with a link to the signup page and a button to submit the form 
  return (
    <div id='login' className='container'>
      <div className='row'>
        <h3 className='mb-4 text-center'>Login</h3>
        <form onSubmit={handleFormSubmit}>
          <div className='form-group my-1'> 
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder='Enter email'
              className='form-control'
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group my-1'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className='form-control'
              placeholder='Enter password'
              value={password}
              onChange={handleInputChange}
            />
          </div>
          {errors && <p>{errors}</p>}
        </form>
        <div className='mx-auto text-center'>
          <button className='btn btn-primary text-end mt-3 mb-1 col-12 text-center mx-auto' type="submit" onClick={handleFormSubmit}>Login</button>
          <Link to="/signup">← Go to Signup</Link>
        </div>
      </div>
    </div>
  );
}
