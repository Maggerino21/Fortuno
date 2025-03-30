"use client"
import React from 'react';
import dynamic from 'next/dynamic';

// Import the entire Recharts library with no SSR
const RechartsComponent = dynamic(
  () => import('./RechartsDistribution'),
  { ssr: false }
);

const NetWorthDistributionSection: React.FC = () => {
  return (
    <div className="distribution-container">
      <h2 className="section-title">Distribution</h2>
      
      <div className="pie-chart" style={{ height: 300, width: '100%' }}>
        <RechartsComponent />
      </div>
    </div>
  );
};

export default NetWorthDistributionSection;