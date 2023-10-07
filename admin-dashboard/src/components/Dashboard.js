import { MovieContext } from './MovieContext';
import React, { useContext } from 'react';
import Movies from './Movies';
import Reviews from './Reviews';
import Users from './Users';

import './componentCSS/TopBar.css'
import MessageContext from "../context/MessageContext";

function Dashboard() {
  const { message, setMessage } = useContext(MessageContext);
  
  return (
    <div>
      {message && <div style={{margin: 'auto', marginTop: "1rem", padding: '1rem', borderRadius: "5px", color: "white", backgroundColor: "#83D475", width: "fit-content", alignContent:"center"}}>{message}</div>}
      <div className="dashboard-content">
        <Movies/>
      </div>
    </div>
  );
};

export default Dashboard;