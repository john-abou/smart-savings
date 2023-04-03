import React, { createContext, useContext } from 'react';
import { useProductReducer } from '../utils/reducers';

// Create context for global state
const StoreContext = createContext();

// Create provider component to be wrapped around the app
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    users: [],
    cartOpen: false,
  });

  return <StoreContext.Provider value={[state, dispatch]} {...props} />;
}

const useStoreContext = () => {
  return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };