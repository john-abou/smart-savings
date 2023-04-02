import React, { useEffect, useState } from 'react';
import { QUERY_USER, QUERY_USERS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// Import the userhOME AND ADMINHOME COMPONENTS
import UserHome from './user/Userhome';
import AdminHome from './admin/adminHome';

export default function Home() {

  // Get the user type from the database
  /* const { data } = useQuery(QUERY_USER);
  console.log('----', data);
  const user = data?.user || {};
  const admin = user?.admin; */

  const { data } = useQuery(QUERY_USER);
  const user = data?.user || {};

  return (
    <div>
      {user.admin ?
        <AdminHome /> :
        <UserHome />
      }
    </div>
  );
}