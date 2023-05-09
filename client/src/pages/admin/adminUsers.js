import React, {useEffect} from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import { UPDATE_USERS } from "../../utils/actions";
import UserItem from "../../components/admin/UserItem";
import { useStoreContext } from "../../contexts/GlobalContext";
import './style.css'

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
      <div className='container-fluid'>
          <h2 className="text-center my-4 mb-5">Users</h2>
          <div className='users-container'>
          {userData.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}