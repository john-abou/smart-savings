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
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/purchased"
                element={<Purchased />}
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