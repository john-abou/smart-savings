// Admin page that allows user management
// Import dependencies and queries
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS, UPDATE_USERS } from "../../utils/queries";
import UserItem from "../../components/admin/UserItem";
import { useStoreContext } from "../../contexts/GlobalContext";

export default function AdminUsers() {
  const [state, dispatch] = useStoreContext();
  const { loading, error, data } = useQuery(QUERY_USERS);
  const userData = data?.users || [];
  console.log(userData);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <h2>Users</h2>
        {userData.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}