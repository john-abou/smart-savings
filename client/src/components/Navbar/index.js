import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import bazaar from '../../images/bazaar-transparent.png';
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import CartContainer from '../User/CartContainer';
import './style.css';

export default function Navbar() {
  // Determine if the user is loggedIn
  const loggedIn = Auth.loggedIn();

  // Determine if the user is an admin
  const { data } = useQuery(QUERY_USER);
  const user = data?.user || {};

  const isMobile = window.innerWidth <= 589;

  return (
    <nav className="navbar navbar-expand-md navbar-dark" style={{backgroundColor: '#FE7E67'}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className='brand-img' src={bazaar} height={isMobile ? "18" : "25"} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {!loggedIn ? (
            <div className="d-flex flex-row justify-content-center align-items-center navbar-links">
              <ul className='navbar-nav navbar-links'>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          ) : user.admin ? (
          <div className="d-flex flex-row justify-content-center align-items-center navbar-links">
            <ul className='navbar-nav navbar-links'>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          ) : (
            <div className="navbar-links-user navbar-links text-center">
              <CartContainer />
              <ul className='navbar-nav navbar-links-loggedIn'>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
  
