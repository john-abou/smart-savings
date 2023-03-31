import React from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { UPDATE_USER } from '../../../utils/mutations';
import { UPDATE_USERS } from '../../../utils/actions';
import { useMutation } from '@apollo/client';

export default function UserItem( {user} ) {
  const [state, dispatch] = useStoreContext();
  const { users } = state;


  const [updateUsers, {error}] = useMutation(UPDATE_USER);
  

  const handleEditClick = (e) => {
    // Get input from the user to confirm the account type
    const accountType = prompt('Enter the account type of the user: (regular/admin)');
    // If the user enters a valid account type, update the user's account type
    if (accountType === 'regular' || accountType === 'admin') {
      // Update the user's account type in the database
      try{ 
        const { data } = updateUsers({
        variables: {
          _id: user._id,
          admin: accountType
          }
        });
      } catch (e) {
        console.log(e);
      }
      // Update the user's account type in the global state
      // const updatedUsers = users.map((u) => {
      //   if (u._id === user._id) {
      //     u.admin = accountType;
      //   }
      //   return u;
      // });
      // dispatch({
      //   type: UPDATE_USERS,
      //   users: updatedUsers
      // });
    }
  };

  return (
    <div className='col-12'>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>Email: {user.email}</p>
      <p id='accountType'>Account Type: {user.admin}</p>


      {/* Button trigger for modal */}
      <button type='button' className='btn btn-primary' onClick={handleEditClick}>
        Edit
      </button>
    </div>
  )
} 