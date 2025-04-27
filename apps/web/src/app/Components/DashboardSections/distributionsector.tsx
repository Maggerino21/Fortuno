"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import DistributionList from './DistributionList';

// Import the Recharts component with no SSR
const RechartsComponent = dynamic(
  () => import('./RechartsDistribution'),
  { ssr: false }
);

const NetWorthDistributionSection: React.FC = () => {
  return (
    <div className="dashboard-section">
      <h2 className="section-title">Distribution</h2>
      <div className="flex-grow">
        <RechartsComponent />
      </div>
    </div>
  );
};

export default NetWorthDistributionSection;