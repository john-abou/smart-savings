import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useHistory } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { StoreProvider } from 'redux';
import { AdminOrders, AdminProducts, AdminUsers } from './Admin';
import { client } from '../apolloClient';
import { logout } from '../actions/authActions';

// Check if user is logged in before rendering the AdminDashboard component by accessing the user property from the Redux store using the useSelector hook
export const AdminDashboard = () => {
  // dispatch is used to dispatch actions to the Redux store using the useDispatch hook to call the logout action
  const dispatch = useDispatch();
  // history is used to redirect the user to the login page if they are not logged in using the useHistory hook
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  // If the user is not logged in, it redirects the user to the login page
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  // If the user is logged in, it renders the AdminDashboard component with links to the Orders, Products, and Users pages and Routes to the AdminOrders, AdminProducts, and AdminUsers components
  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/admin/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/admin/products">Products</Link>
                </li>
                <li>
                  <Link to="/admin/users">Users</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Routes>
          </div>
        </Router>
      </StoreProvider>
    </ApolloProvider>
  );
};

// *** CHECK TO SEE*** components (AdminOrders, AdminProducts, and AdminUsers) should be implemented and exported from their respective files within the components folder

