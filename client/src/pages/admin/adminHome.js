import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome( admin ) {
  return(
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <div>
        <h2>Quick Links:</h2>
        <ul>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/products">Manage Products</Link></li>
        </ul>
      </div>
    </div>
  )
}
