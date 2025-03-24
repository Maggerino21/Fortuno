import React from 'react';
import NetWorthSection from './Components/DashboardSections/fortunesector';
import NetWorthDistributionSection from './Components/DashboardSections/distributionsector';
import UserGreeting from './Components/usergreeting';

// Placeholder components for other sections
const AssetsLiabilitiesSection = () => <div className='dashboard-section'></div>;
const CashFlowSection = () => <div className="dashboard-section">Cash Flow</div>;
const DistributionSubSection = () => <div className="dashboard-section">Expenses Breakdown</div>;
const RecentTransactionsSection = () => <div className="dashboard-section">Recent Transactions</div>;


export default function Home() {
  const username = "Dexter"
  return (
    <main className="dashboard-container">
      <UserGreeting username='username' />
      <div className="dashboard-grid">
        {/* Top Row */}
        <div className="dashboard-item">
          <NetWorthSection />
        </div>
        <div className="distribution-item">
          <NetWorthDistributionSection />
        </div>
        <div className="dashboard-item">
          <AssetsLiabilitiesSection />
        </div>
        
        {/* Bottom Row */}
        <div className="dashboard-item">
          <CashFlowSection />
        </div>
        <div className="dashboard-item">
          <DistributionSubSection />
        </div>
        <div className="dashboard-item">
          <RecentTransactionsSection />
        </div>
      </div>
    </main>
  );
}