import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductList } from '../components';

// Check if user is logged in before rendering the UserDashboard component by accessing the isLoggedIn property from the Redux store using the useSelector hook
const UserDashboard = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  //  If the user is not logged in, it renders a message prompting them to login before accessing the page   
  if (!isLoggedIn) {
    return <div>You need to be logged in to access this page.</div>;
  }

  // If the user is logged in, it renders the UserDashboard component with a link to the Products page and a Route to the ProductList component 
  return (
    <div>
      <h1>User Dashboard</h1>
      <Router>
        <nav>
          <ul>
            <li>
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
