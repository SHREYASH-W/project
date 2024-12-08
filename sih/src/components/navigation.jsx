import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Navigation = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
          Upload Documents
          </Link>
        </li>
        <li>
          <Link to="/insights" className="nav-link">
            Insights
          </Link>
        </li>
        <li>
          <Link to="/home" className="nav-link">
            Results
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;