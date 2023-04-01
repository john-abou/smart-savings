import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Navbar from '../components/Navbar';
import Auth from '../utils/auth';

// Login page component that renders a form to log in a user
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Define a state for form validation errors (useState hook)
  const [errors, setErrors] = useState(null);
  // Define the loginUser mutation (useMutation hook) and pass in the LOGIN mutation
  const [loginUser, {error, data}] = useMutation(LOGIN);

  // handleFormSubmit function to execute loginUser mutation and handle errors
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ variables: { email, password } });
      console.log('Login Form Response: ', response)
      // Define the JWT from the response
      const token = response.data.login.token;
      console.log('Login Form Token: ', token)
      // Store the JWT in local storage
      Auth.login(token);
    } catch (error) {
      setErrors(error.message);
    }
  };

  // handleInputChange function to update state based on form input changes 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // name will be either 'email' or 'password'
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Render the login form with a link to the signup page and a button to submit the form 
  return (
    <div>
      <Navbar />
      <Link to="/signup">← Go to Signup</Link>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        {errors && <p>{errors}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
