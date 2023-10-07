import React from 'react';
import { Link } from "react-router-dom";
import '../componentCSS/TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <h1 className="admin">Admin Dashboard</h1>
      <h1><Link className="other-link" to="/">Home</Link></h1>
      <h1><Link className="other-link" to="/users">Users</Link></h1>
      <h1><Link className="other-link" to="/reviews">Reviews</Link></h1>
    </div>
  );
};

export default TopBar;
