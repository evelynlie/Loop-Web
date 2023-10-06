import React, { useContext } from 'react';
import { MovieContext } from './MovieContext';
import Movies from './Movies';
import './componentCSS/TopBar.css'

function Dashboard() {

  return (
    <div>
      <div className="dashboard-content">
        <Movies/>
      </div>
    </div>
  );
};

export default Dashboard;