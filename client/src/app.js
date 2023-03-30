import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { StoreProvider } from './contexts/GlobalContext';

// import components
// import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductPage from './pages/Product';
import Purchased from './pages/Purchased';
import Wildcard from './pages/404';
import ProductContainer from './components/User/ProductContainer';
import UserHome from './pages/user/Userhome';

// Construct the Apollo client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router>
          <div>
            <Routes>
              <Route 
                  path="/" 
                  element={<UserHome />}
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
                path="/Product"
                element={<ProductPage />}
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