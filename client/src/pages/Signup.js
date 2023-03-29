import React from 'react';
import { Link } from 'react-router-dom';
// import components later
// import hook to get global state later
// import apollo queries later 


export default function Signup() {
  // Define initial form state (useState hook)
  // Define a state for form validation
  // Define the form from DOM

  // Define a function to handle form submission (should use apollo client to execute mutation)

  // Define a function to handle form validation

  // Define a function to handle form input changes

  // Form should have a checkmark for admin/user roles

  return (
    <div>
      <Link to="/login">← Go to Login</Link>
      <form>
        <div classNameName="form-group">
          <label for="username">Username</label>
          <input type="text" className="form-control" id="username" aria-describedby="username" placeholder="Enter username" />
        </div>
        <div className="form-group">
          <label for="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-group">
          <label for='admin' className="form-check-label"> Admin </label>
          <input type="checkbox" className="form-check-input" id="admin" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
