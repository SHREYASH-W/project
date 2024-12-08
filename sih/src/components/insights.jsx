import React from 'react'
import './insights.css'
import reactSvg from './react.svg';
const Insights = () => {
  const rules = [
    { heading: "Student population", value: Math.floor(Math.random() * 501), image: reactSvg },
    { heading: "Student-Staff Ratio", value: Math.floor(Math.random() * 50) + " : " + Math.floor(Math.random() * 50), image: reactSvg },
    { heading: "Teaching Quality", value: Math.floor(Math.random() * 501), image: reactSvg },
    { heading: "Industry Impact", value: Math.floor(Math.random() * 501), image: reactSvg },
    { heading: "International Outlook", value: Math.floor(Math.random() * 501), image: reactSvg },
    { heading: "Female-Male Ratio", value: Math.floor(Math.random() * 50) + " : " + Math.floor(Math.random() * 50), image: reactSvg },
  ];
 
  return (
    <div className='insights-container'>
      <div className='insights-grid'>
        {
          rules.map(({ heading, value, image }) => (
            <div key={heading} className='insight-card'>
              <img src={image} alt={heading} className='insight-image' />
              <h2 className='insight-heading'>{heading}</h2>
              <p className='insight-value'>{value}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default Insights