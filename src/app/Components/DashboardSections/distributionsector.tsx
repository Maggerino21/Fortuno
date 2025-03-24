import React from 'react';

const NetWorthDistributionSection: React.FC = () => {
  // Mock data for net worth distribution
  const netWorthSources = [
    { category: 'Real Estate', percentage: 40, color: '#6366f1' },
    { category: 'Investments', percentage: 30, color: '#8b5cf6' },
    { category: 'Cash', percentage: 15, color: '#14b8a6' },
    { category: 'Other Assets', percentage: 15, color: '#ec4899' }
  ];

  // Generate CSS conic-gradient for the pie chart
  const generateConicGradient = () => {
    let gradientString = '';
    let currentDegree = 0;
    
    netWorthSources.forEach(source => {
      const startDegree = currentDegree;
      currentDegree += source.percentage * 3.6; // Convert percentage to degrees (100% = 360 degrees)
      
      gradientString += `${source.color} ${startDegree}deg ${currentDegree}deg, `;
    });
    
    // Remove trailing comma and space
    return `conic-gradient(${gradientString.slice(0, -2)})`;
  };

  return (
    <div className="distribution-container">
      <h2 className="section-title">Distribution</h2>
      
      <div className="pie-chart">
        <div 
          className="pie" 
          style={{ 
            background: generateConicGradient(),
          }}
        >
          <div className="pie-center"></div>
        </div>
      </div>
      
      <div className="pie-legend">
        {netWorthSources.map((source, index) => (
          <div key={index} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: source.color }}></span>
            <span className="legend-label">{source.category}: {source.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetWorthDistributionSection;