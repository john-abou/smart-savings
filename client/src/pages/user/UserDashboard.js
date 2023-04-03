import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductList } from '../components';

// Check if user is logged in before rendering the UserDashboard component by accessing the isLoggedIn property from the Redux store using the useSelector hook
const UserDashboard = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <div>You need to be logged in to access this page.</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <Router>
        <nav>
          <ul>
            <li>
              {/* // Link to the Products page */}
              <Link to="/products">Products</Link>
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
