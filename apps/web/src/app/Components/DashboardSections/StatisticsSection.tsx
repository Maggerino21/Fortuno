"use client";

import React from 'react';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import SavingsIcon from '@mui/icons-material/Savings';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

interface StatisticItem {
  id: string;
  text: string;
  icon: React.ReactNode;
  value: string;
  trend: 'positive' | 'negative' | 'neutral';
  tooltip?: string;
}

const StatisticsSection: React.FC = () => {
  // Mock data for statistics - in production, these would be calculated from API data
  const statistics: StatisticItem[] = [
    {
      id: 'savings',
      text: 'Saved this year',
      icon: <SavingsIcon />,
      value: '$2,300',
      trend: 'positive',
      tooltip: 'Total deposits to your savings accounts in 2025'
    },
    {
      id: 'returns',
      text: 'Investment returns',
      icon: <TrendingUpIcon />,
      value: '$500',
      trend: 'positive',
      tooltip: 'Total returns from your investments this month'
    },
    {
      id: 'projection',
      text: 'Projected $300K by',
      icon: <PriceCheckIcon />,
      value: 'October 2025',
      trend: 'neutral',
      tooltip: 'Based on your current savings rate and investment performance'
    },
    {
      id: 'top_asset',
      text: 'Top performing asset',
      icon: <StarBorderIcon />,
      value: 'TSLA +12%',
      trend: 'positive',
      tooltip: 'Your best performing investment over the past month'
    },
    {
      id: 'monthly_growth',
      text: 'Monthly growth',
      icon: <EqualizerIcon />,
      value: '2.1%',
      trend: 'positive',
      tooltip: 'Net worth increase over the previous month'
    },
    {
      id: 'spending',
      text: 'Spending trend',
      icon: <ShoppingBagIcon />,
      value: '5% less',
      trend: 'positive',
      tooltip: 'Compared to your 3-month average'
    }
  ];

  // Get color based on trend
  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'positive':
        return 'var(--success-color)';
      case 'negative':
        return 'var(--error-color)';
      default:
        return 'var(--text-color)';
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Financial Insights</h2>
      
      <div className="statistics-container">
        {statistics.map((stat) => (
          <div 
            key={stat.id}
            className="statistic-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              marginBottom: '0.75rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              position: 'relative'
            }}
            title={stat.tooltip}
          >
            <div 
              className="statistic-icon"
              style={{ 
                marginRight: '0.75rem',
                opacity: 0.8,
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {stat.icon}
            </div>
            
            <div style={{ flex: 1 }}>
              <div 
                className="statistic-text"
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.2rem'
                }}
              >
                {stat.text}
              </div>
              
              <div 
                className="statistic-value"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: getTrendColor(stat.trend)
                }}
              >
                {stat.value}
              </div>
            </div>
            
            <div 
              className="statistic-trend"
              style={{
                fontSize: '0.9rem',
                marginLeft: '1rem',
                color: getTrendColor(stat.trend)
              }}
            >
              {stat.trend === 'positive' ? '↑' : stat.trend === 'negative' ? '↓' : ''}
            </div>
          </div>
        ))}
      </div>
      
      <div 
        className="statistics-update-time"
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginTop: '1rem',
          opacity: 0.8
        }}
      >
        Last updated: Today, 4:30 PM
      </div>
    </div>
  );
};

export default StatisticsSection;