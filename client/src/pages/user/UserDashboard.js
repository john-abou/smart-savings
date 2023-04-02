import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductList } from '../components';

const UserDashboard = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', fontSize: '2rem', marginTop: '5rem' }}>
        You need to be logged in to access this page.
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>User Dashboard</h1>
      <Router>
        <nav style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <ul style={{ listStyle: 'none', display: 'flex', margin: '0', padding: '0' }}>
            <li style={{ marginRight: '2rem' }}>
              <Link to="/products" style={{ fontSize: '2rem', color: '#333', textDecoration: 'none' }}>
                Products
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default UserDashboard;
