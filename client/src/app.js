/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { StoreProvider } from './contexts/GlobalContext';

// import components
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductPage from './pages/Product';
import Purchased from './pages/Purchased';
import Wildcard from './pages/404';
import AdminHome from './pages/admin/adminHome';
import AdminUsers from './pages/admin/adminUsers';
import AdminProducts from './pages/admin/adminProducts';
import AdminProductPage from './pages/admin/adminEditProduct';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from 'jwt-decode';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

console.log('Auth Link:', authLink)

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <div>
          <StoreProvider>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/purchased"
                element={<Purchased />}
              />
              <Route 
                path="/products/:id" 
                element={<ProductPage />} 
              />
              <Route 
                path="/admin/users" 
                element={<AdminUsers />} 
              />
              <Route 
                path="/admin/products" 
                element={<AdminProducts />} 
              />
              <Route 
                path="/products/admin/:id" 
                element={<AdminProductPage />} 
              />
              <Route
                path="/*"
                element={<Wildcard />}
              />
            </Routes>
            </StoreProvider>
          </div>
        </Router>
    </ApolloProvider>

  )
}