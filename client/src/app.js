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
//import ProductContainer from './components/user/ProductContainer';
import UserHome from './pages/user/Userhome';

import AdminHome from './pages/admin/adminHome';
import AdminUsers from './pages/admin/adminUsers';
import AdminProducts from './pages/admin/adminProducts';
import AdminProductPage from './pages/admin/adminEditProduct';

const PORT = process.env.PORT || 3001;

let graphqlPath = `http://localhost:${PORT}/graphql`;

if (process.env.NODE_ENV === "production") {
  graphqlPath = "/graphql";
}
const httpLink = createHttpLink({
  uri: graphqlPath,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


console.log(client);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Router>
          <div>
            <Routes>
              <Route
                path="/"
                element={<AdminHome />}
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