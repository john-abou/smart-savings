import React from 'react';
import { useStoreContext } from '../../contexts/GlobalContext';

export default function UserItem( {user} ) {
  const [state, dispatch] = useStoreContext();
  const { users } = state;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: UPDATE_USERS,
      users: [...users, { [name]: value }],
    });
  };


  return (
    <div className='col-12'>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>Email: {user.email}</p>
      <textbox>Admin: {user.admin ? "admin" : "regular"}</textbox>
      <button
      onClick={handleInputChange}
      >
        <a href={`/admin/users/${user._id}`}>Edit</a>
      </button>
    </div>
  )
} 