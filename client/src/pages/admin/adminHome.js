import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function AdminHome() {
  return(
    <div>
      <Navbar />
      <h1>Welcome to the Admin Dashboard</h1>
      <div>
        <h2>Quick Links:</h2>
        <ul>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/products">Manage Products</Link></li>
          <li><Link to="/admin/orders">View Orders</Link></li>
        </ul>
      </div>
      <div>
      </div>
    </div>
  )
}
