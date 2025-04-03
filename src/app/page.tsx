import React from 'react';
import NetWorthSection from './Components/DashboardSections/fortunesector';
import NetWorthDistributionSection from './Components/DashboardSections/distributionsector';
import UserGreeting from './Components/usergreeting';

const AssetsLiabilitiesSection = () => <div className='dashboard-section'></div>;

export default function Home() {
  const username = "Dexter";
  
  return (
    <main className="dashboard-container">
      <UserGreeting username={username} />
      
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-item">
          <NetWorthDistributionSection />
        </div>
        
        {/* Middle Column */}
        <div className="dashboard-item">
          <NetWorthSection />
        </div>
        
        {/* Right Column */}
        <div className="dashboard-item">
          <AssetsLiabilitiesSection />
        </div>
      </div>
    </main>
  );
}