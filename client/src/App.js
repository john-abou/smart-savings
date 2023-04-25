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
import AdminAddProductPage from './pages/admin/adminAddProduct';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

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
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/*" element={<Wildcard />} />

              {/* Protected Routes Use the loggedin boolean to protect the following routes  */}
              <Route path="/admin" element={(Auth.loggedIn() ? <AdminHome /> : <Login /> )} />
              <Route path="/admin/products" element={(Auth.loggedIn() ? <AdminProducts /> : <Login /> )} />
              <Route path="/admin/users" element={(Auth.loggedIn() ? <AdminUsers /> : <Login /> )} />
              <Route path="/products/admin/:id" element={(Auth.loggedIn() ? <AdminProductPage /> : <Login /> )} />
              <Route path="/purchased" element={(Auth.loggedIn() ? <Purchased /> : <Login /> )} />
              <Route path="/products/:id" element={(Auth.loggedIn() ? <ProductPage /> : <Login /> )} />
              <Route path="/admin/products/add" element={(Auth.loggedIn() ? <AdminAddProductPage /> : <Login /> )} />
            </Routes>
            </StoreProvider>
          </div>
        </Router>
    </ApolloProvider>
  )
}