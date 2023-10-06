import React, { useContext } from 'react';
import { MovieContext } from './MovieContext';
import Movies from './Movies';
import TopBar from './miniComponents/TopBar'
import './componentCSS/TopBar.css'

function Dashboard() {

  return (
    <div>
      <TopBar/>
      <div className="dashboard-content">
        <Movies/>
      </div>
    </div>
  );
};

export default Dashboard;