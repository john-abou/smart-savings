import React from 'react';
import { UPDATE_USER } from '../../../utils/mutations';
import { useMutation } from '@apollo/client';
import './style.css'

export default function UserItem( {user} ) {  
  const [updateUsers, { error }] = useMutation(UPDATE_USER);
  
  const handleChange = async (event) => {
    const userType = event.target.value;
    const isAdmin = userType === 'admin' ? true : false;
    const _id = user._id;

    try {
      const { data } = await updateUsers({
        variables: { _id, isAdmin },
      });
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  return (
    <div className='container-fluid user-container'>
      <div id='user-row'>
        <h3 className='col-4 user-name'>
          {user.firstName} {user.lastName}
        </h3>
        <p className='user-text' >{user.email}</p>
        <div className='user-text'>
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
        </div>
      </div>
    </div>
  );
}