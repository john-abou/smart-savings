import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../contexts/GlobalContext';

export default function Navbar() {
  const initialState = useStoreContext();
  const {loggedIn} = initialState;
  // const [state, dispatch] = useReducer(reducer, initialState);

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
          <button className='btn btn-primary'>
            <Link to='/logout'>Logout</Link>
          </button>
        )}      
      </div>
    </nav>
  );
}
