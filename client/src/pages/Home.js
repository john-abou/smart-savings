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

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery(QUERY_USER);

  useEffect(() => {
    if (data) {
      setUser(data.user.admin);
      setIsLoading(false)
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      console.log(user);
    }
  }, [user]);

  return (
    <div>
      {user ?
        <AdminHome /> :
        <UserHome />
      }
    </div>
  );
}