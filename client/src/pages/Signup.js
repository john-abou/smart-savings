import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import components later
// import hook to get global state later
// import apollo queries later 

export default function Signup() {
  // Define initial form state (useState hook)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    admin: false,
  });

  // Define a state for form validation
  const [errors, setErrors] = useState({});

  // Define the form from DOM
  const handleSubmit = (e) => {
    e.preventDefault();
    // execute apollo mutation with form data
  };

  // Define a function to handle form validation
  const validateForm = () => {
    // add validation logic
  };

  // Define a function to handle form input changes
  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));
  };

  return (
    <div>
      <Link to="/login">← Go to Login</Link>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="admin" className="form-check-label">
            Admin
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="admin"
            checked={formData.admin}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
