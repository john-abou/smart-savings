import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import bazaar from '../../images/bazaar-transparent.png'

export default function Navbar() {
  // Determine if the user is loggedIn
  const loggedIn = Auth.loggedIn();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark' style={{backgroundColor: '#FE7E67'}}>
      <div className='container-fluid d-flex flex-row justify-content-between'>
        <Link className='navbar-brand' to='/'>
          <img src={bazaar} height='25'></img>
        </Link>
        { /* Render login/signup or logout based on user state */}
        {!loggedIn ? (
          <div>
            <button className='btn btn-outline-primary mx-2'>
              <Link to='/login'>Login</Link>
            </button>
            <button className='btn btn-outline-primary mx-2'>
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
