import React from 'react';
import { MovieProvider } from './components/MovieContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <MovieProvider>
      <Dashboard/>
    </MovieProvider>
  );
};

export default App;
