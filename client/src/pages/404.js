import React from 'react';
import { Link} from 'react-router-dom';


// import components later
// import hook to get global state later
// import apollo queries later 

function Wildcard() {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}