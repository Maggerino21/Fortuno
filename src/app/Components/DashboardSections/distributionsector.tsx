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
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Distribution</h2>
      <div className="flex-grow">
        <RechartsComponent />
      </div>
    </div>
  );
};

export default NetWorthDistributionSection;