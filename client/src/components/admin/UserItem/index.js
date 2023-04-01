import React from 'react';
import { useStoreContext } from '../../../contexts/GlobalContext';
import { UPDATE_USER } from '../../../utils/mutations';
import { useMutation } from '@apollo/client';

export default function UserItem( {user} ) {
  const [state, dispatch] = useStoreContext();
  const { users } = state;
  console.log(users);
  
  const [updateUsers, { error }] = useMutation(UPDATE_USER);
  
  const handleChange = async (event) => {
    const userType = event.target.value;
    const isAdmin = userType === 'admin' ? true : false;
    const _id = user._id;
    console.log('isAdmin: ', isAdmin);
    console.log('userId: ', _id);

    try {
      const { data } = await updateUsers({
        variables: { _id, isAdmin },
      });
      console.log(data);
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  return (
    <div className='col-12'>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>Email: {user.email}</p>
      <div className="form-check" onChange={handleChange}>
        <input
          className="form-check-input" 
          type="radio" 
          name={`isAdmin-${user.firstName}`} 
          value="admin" 
          id={`typeAdmin-${user._id}`} 
          checked={user.admin}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={`typeAdmin-${user._id}`}>
          Admin
        </label>
      </div>
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="radio" 
          name={`isAdmin-${user.firstName}`} 
          value="regular" 
          id={`typeUser-${user._id}`} 
          checked={!user.admin} 
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={`typeUser-${user._id}`}>
          User
        </label>
      </div>

      <p id='accountType'>User Type: {user.admin ? 'Admin' : 'User'} </p>
    </div>
  );
}