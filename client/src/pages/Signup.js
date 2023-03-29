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
      <form>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" aria-describedby="username" placeholder="Enter username" />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" />
        </div>
        <div class="form-group">
          <label for='admin' class="form-check-label"> Admin </label>
          <input type="checkbox" class="form-check-input" id="admin" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
