import React from 'react';
// import components later
// import hook to get global state later
// import apollo queries later 
// import hooks to use query/mutations apollo later
import GET_USER_TYPE from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';

export default function Home( ) {
  return (
    <div>
      {/* Render the Product Container */}
      {/* admin ? 
        <adminHome /> :
        <userHome /> */}
      {/* Render the Cart Component */}
    </div>
  );
}