import React from 'react';
import { QUERY_USER, QUERY_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// Import the userhOME AND ADMINHOME COMPONENTS
import UserHome from './user/Userhome';
import AdminHome from './admin/AdminHome';

export default function Home( ) {

  // Get the user type from the database
  const { loading, data } = useQuery(QUERY_USER);
  console.log('----', data);
  const user = data?.user || {};
  const admin = user?.admin;


  return (
    <div>
      {admin ?
        <AdminHome /> :
        <UserHome />
      } 
    </div>
  );
}