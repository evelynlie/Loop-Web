import React from 'react';
import { MovieProvider } from './components/MovieContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import TopBar from './components/miniComponents/TopBar'; // Import the TopBar component

function App() {
  return (
    <MovieProvider>
      <Router>
        <TopBar/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </MovieProvider>
  );
};

export default App;
