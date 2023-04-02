// Admin page that allows user management
// Import dependencies and queries
import React, {useEffect, useMutation} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import UserItem from "../../components/admin/UserItem";
import { useStoreContext } from "../../contexts/GlobalContext";
import Navbar from "../../components/Navbar";
export default function AdminUsers() {
  const [state, dispatch] = useStoreContext();
  const { loading, error, data } = useQuery(QUERY_USERS);
  const userData = data?.users || [];

  // Can be used in the future if we change any user info to re-render info on the page.
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_USERS,
        users: userData
      });
    } else {
      console.log('No data found');
    }
  }, [data, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='container-fluid'>
        <div className='row'>
          <h2>Users</h2>
          {userData.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>



  );
}