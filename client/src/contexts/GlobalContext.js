import React, { createContext, useContext, useState } from 'react';

// Create context for global state
const StoreContext = createContext();

// Create provider component to be wrapped around the app
const StoreProvider = ({ value = [], ...props }) => {
  const [store, setStore] = useState({
    products: [],
    cart: [],
    admin: false, 
    loggedIn: false,
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <StoreContext.Provider value={store} {...props} />;
}

const useStoreContext = () => {
  return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };