import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import bazaar from '../../images/bazaar-transparent.png';
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import CartContainer from '../User/CartContainer';
import Dropdown from 'react-bootstrap/Dropdown';
import './style.css';

export default function Navbar() {
  // Determine if the user is loggedIn
  const loggedIn = Auth.loggedIn();

  // Determine if the user is an admin
  const { data } = useQuery(QUERY_USER);
  const user = data?.user || {};

  return (
    <nav className='navbar navbar-expand-lg navbar-dark' style={{backgroundColor: '#FE7E67'}}>
      <div className='container-fluid d-flex flex-row justify-content-between'>
        <Link className='navbar-brand' to='/'>
          <img src={bazaar} height='25'></img>
        </Link>
        { /* Render the login/signup or logout and cart based on account type/login info. ∂*/}
        {!loggedIn ? (
          <div className='navbar-links'>
            <button className='btn btn-outline-primary nav-button mx-2'>
              <Link to='/login'>Login</Link>
            </button>
            <button className='btn btn-outline-primary nav-button mx-2'>
              <Link to='/signup'>Sign Up</Link>
            </button> 
          </div>
        ) : user.admin ? ( 
          <button className='btn btn-outline-primary navbar-links' onClick={Auth.logout}>
            <Link to='/logout'>Logout</Link>
          </button>
            ) : (
          <div className='d-flex flex-row justify-content-center align-items-center navbar-links'>
            <CartContainer />
            <button className='btn btn-outline-primary nav-button mx-2' onClick={Auth.logout}>
              <Link to='/logout'>Logout</Link>
            </button>
          </div>
            )
        }
      </div>
    </nav>
  );
}
