import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../contexts/GlobalState';

export default function Navbar() {
  const [state, dispatch] = useStoreContext();

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid d-flex flex-row justify-content-between'>
        <Link className='navbar-brand' to='/'>
          Smart Savings
        </Link>
        { /* Render login/signup or logout based on user state */}
        {!state.loggedIn ? (
          <div>
            <button className='btn btn-primary'>
              <Link to='/login'>Login</Link>
            </button>
            <button className='btn btn-primary'>
              <Link to='/signup'>Sign Up</Link>
            </button> 
          </div>
        ) : (
          <button className='btn btn-primary'>
            <Link to='/logout'>Logout</Link>
          </button>
        )}      
      </div>
    </nav>
  );
}
