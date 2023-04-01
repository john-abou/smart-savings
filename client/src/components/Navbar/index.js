import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

export default function Navbar() {
  // Determine if the user is loggedIn
  const loggedIn = Auth.loggedIn();
  console.log('loggedIn boolean: ', loggedIn)

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid d-flex flex-row justify-content-between'>
        <Link className='navbar-brand' to='/'>
          Smart Savings
        </Link>
        { /* Render login/signup or logout based on user state */}
        {!loggedIn ? (
          <div>
            <button className='btn btn-outline-primary'>
              <Link to='/login'>Login</Link>
            </button>
            <button className='btn btn-outline-primary'>
              <Link to='/signup'>Sign Up</Link>
            </button> 
          </div>
        ) : (
          <button className='btn btn-outline-primary' onClick={Auth.logout}>
            <Link to='/logout'>Logout</Link>
          </button>
        )}      
      </div>
    </nav>
  );
}
