import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import { StoreProvider } from './utils/GlobalState';

// import components
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Product from './pages/Product';
import Purchased from './pages/Purchased';
import Wildcard from './pages/404';

// Construct the Apollo client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route 
                  path="/" 
                  element={/* Add home component */} 
                />
              <Route
                path="/login"
                element={/* Add login component */}
              />
              <Route
                path="/signup"
                element={/* Add signup component */}
              />
              <Route
                path="/profile"
                element={/* Add profile component */}
              />
              <Route
                path="/purchased"
                element={/* Add purchased component */}
              />
              <Route
                path="/*"
                element={<Wildcard />}
              />
            </Routes>
          </div>
        </Router>
      </StoreProvider>
    </ApolloProvider>

  )
}