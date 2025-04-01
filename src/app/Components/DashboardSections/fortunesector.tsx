"use client";

import React, { useState, useEffect } from 'react';
import CountingNumber from './CountingNumber';
import NetWorthChart from './NetWorthChart';

const NetWorthSection: React.FC = () => {
  // Mock data for net worth
  const netWorth = 120000;
  const monthlyChange = 2500;
  const monthlyChangePercentage = 2.1;
  
  // State to track previous net worth value (for animation start)
  const [prevNetWorth, setPrevNetWorth] = useState(0);
  
  // Update the previous net worth when the current value changes
  // In a real app, this would happen when new data is fetched
  useEffect(() => {
    // Start with 0 on initial load for a nice animation
    setPrevNetWorth(prev => prev === 0 ? 0 : netWorth - monthlyChange);
    
    // You could simulate changing data with:
    // const interval = setInterval(() => {
    //   setPrevNetWorth(netWorth);
    //   // Then update netWorth with new data
    // }, 10000);
    // return () => clearInterval(interval);
  }, [netWorth]);

  return (
    <div className="net-worth-container">
      <h2 className="section-title">Your Net Worth</h2>
      
    <div className="net-worth-value">
      <CountingNumber 
        value={netWorth} 
        start={prevNetWorth} 
        duration={1500} 
        prefix="$"
      />
    </div>
      
      <div className="change-indicator">
        <span className="text-success">
          ↑ ${monthlyChange.toLocaleString()} ({monthlyChangePercentage}%)
        </span>
        <span className="period-label">this month</span>
      </div>
      <NetWorthChart/>
    </div>
  );
};
export default NetWorthSection;