import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  Award, 
  MapPin, 
  TrendingUp, 
  FileSpreadsheet 
} from 'lucide-react';
import './home.css';

const HomePage = () => {
  // University details
  const universityData = {
    name: "Global Innovation University",
    location: "Silicon Valley, California",
    ranking: {
      global: 24,
      national: 7,
      fieldSpecific: {
        engineering: 12,
        computerScience: 8
      }
    },
    performanceData: [
      { category: 'Research Output', score: 85 },
      { category: 'Student Satisfaction', score: 78 },
      { category: 'Infrastructure', score: 92 },
      { category: 'International Collaboration', score: 70 }
    ],
    improvements: [
      "Expand research facilities",
      "Increase international student programs",
      "Upgrade technological infrastructure",
      "Enhance student support services"
    ]
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="main-title">
          University Infrastructure Analysis Dashboard
        </h1>
        
        {/* University Overview Section */}
        <div className="info-card">
          <div className="info-grid">
            <div className="info-item">
              <Award className="info-icon icon-blue" />
              <div>
                <h2 className="info-subtitle">University Name</h2>
                <p>{universityData.name}</p>
              </div>
            </div>
            
            <div className="info-item">
              <MapPin className="info-icon icon-green" />
              <div>
                <h2 className="info-subtitle">Location</h2>
                <p>{universityData.location}</p>
              </div>
            </div>
            
            <div className="info-item">
              <TrendingUp className="info-icon icon-purple" />
              <div>
                <h2 className="info-subtitle">Global Ranking</h2>
                <p>#{universityData.ranking.global}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Chart */}
        <div className="chart-card">
          <h2 className="chart-title">
            University Performance Metrics
          </h2>
          <div className="chart-container">
            <BarChart width={600} height={300} data={universityData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
        
        {/* Improvements Section */}
        <div className="improvements-card">
          <h2 className="improvements-title">
            Key Improvement Areas
          </h2>
          <ul className="improvements-list">
            {universityData.improvements.map((improvement, index) => (
              <li key={index} className="improvements-item">{improvement}</li>
            ))}
          </ul>
        </div>
        
        {/* Upload Document Button */}
        <div className="btn-container">
          <Link to="/dashboard">
            <button className="upload-btn">
              <FileSpreadsheet className="btn-icon" />
              Upload Document
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;