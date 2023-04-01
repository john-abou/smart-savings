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
import AdminHome from './pages/admin/AdminHome';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductPage from './pages/admin/AdminEditProduct';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from 'jwt-decode';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  
  if (token) {
    const decodedToken = jwt_decode(token);
    const user = {
      id: decodedToken._id,
      firstName: decodedToken.firstName,
      email: decodedToken.email,
    };

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    user: JSON.stringify(user),
  };
  }
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
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
<<<<<<< HEAD
                element={<Home />}
=======
                element={<UserHome />}
>>>>>>> main
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
          </div>
        </Router>
      </StoreProvider>
    </ApolloProvider>

  )
}