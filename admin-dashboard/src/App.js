import React, { useState, useEffect }from 'react';
import { MovieProvider } from './components/MovieContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard';
import TopBar from './components/miniComponents/TopBar'; // Import the TopBar component
import MessageContext from "./context/MessageContext";


function App() {
  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if(message === null)
      return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <MovieProvider>
        <Router>
          <TopBar/>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
          </Routes>
        </Router>
      </MovieProvider>
    </MessageContext.Provider>
  );
};

export default App;
