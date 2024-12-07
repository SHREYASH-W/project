import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home'; // import the HomePage component
import MultiModelDashboard from './components/dashboard'; // import the MultiModelDashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<MultiModelDashboard />} />
      </Routes>
    </Router>
  );
};
export default App;
