import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Insights from './components/insights';
import HomePage from './components/home';
import MultiModelDashboard from './components/dashboard';
import Navigation from './components/navigation';

function App() {
  return (
    <Router>
      <div>
        <Navigation /> {/* Optional navigation component */}
        <Routes>
          <Route path="/" element={<MultiModelDashboard />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;