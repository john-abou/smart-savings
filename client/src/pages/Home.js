import React from 'react';
import QUERY_USER from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function Home( ) {

  // Get the user type from the database
  const { loading, data } = useQuery(QUERY_USER);
  const user = data?.user || {};
  const admin = user?.admin;


  return (
    <div>
      {/* If logged In, render the userHome component */}

      {/* admin ? 
        <adminHome /> :
        <userHome /> */}
      {/* Render the Cart Component */}
    </div>
  );
}