import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';
import { StoreProvider } from './utils/GlobalState';

// import components
import Navbar from './components/Navbar';
import Home from './components/Home'


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
            </Routes>
          </div>
        </Router>
      </StoreProvider>
    </ApolloProvider>

  )
}