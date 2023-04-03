import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminHome(admin) {
return (
<div style={{ padding: '2rem', position: 'relative' }}>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
<h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Welcome to the Admin Dashboard</h1>
<p style={{ fontSize: '1.5rem', textAlign: 'center' }}>View and manage user accounts and products.</p>
</div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
<h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Quick Links:</h2>
<ul style={{ fontSize: '1.5rem', listStyleType: 'none', paddingLeft: '0' }}>
<li style={{ marginBottom: '1rem' }}><Link to="/admin/users">Manage Users</Link></li>
<li><Link to="/admin/products">Manage Products</Link></li>
</ul>
</div>
</div>
);
}