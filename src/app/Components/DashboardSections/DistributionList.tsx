"use client";

import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface HoldingItem {
  id: string;
  name: string;
  type: 'stock' | 'crypto' | 'cash' | 'real-estate' | 'other';
  value: number;
  change: number; // Percentage change
  ticker?: string;
  color: string;
}

const DistributionList: React.FC = () => {
  // State for sorting
  const [sortBy, setSortBy] = useState<'value' | 'change'>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Mock data for top holdings
  const holdings: HoldingItem[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      type: 'stock',
      ticker: 'AAPL',
      value: 28500,
      change: 1.2,
      color: '#c7d2fe' // Light indigo
    },
    {
      id: '2',
      name: 'Bitcoin',
      type: 'crypto',
      ticker: 'BTC',
      value: 22000,
      change: -2.8,
      color: '#ddd6fe' // Light purple
    },
    {
      id: '3',
      name: 'Rental Property',
      type: 'real-estate',
      value: 48000,
      change: 0.5,
      color: '#fbcfe8' // Light pink
    },
    {
      id: '4',
      name: 'Cash Reserves',
      type: 'cash',
      value: 18000,
      change: 0,
      color: '#bae6fd' // Light blue
    },
    {
      id: '5',
      name: 'Tesla Inc.',
      type: 'stock',
      ticker: 'TSLA',
      value: 12500,
      change: 4.2,
      color: '#d1fae5' // Light teal
    },
    {
      id: '6',
      name: 'Ethereum',
      type: 'crypto',
      ticker: 'ETH',
      value: 9800,
      change: -1.5,
      color: '#fef3c7' // Light amber
    }
  ];

  // Sort holdings
  const sortedHoldings = [...holdings].sort((a, b) => {
    const compareValue = sortBy === 'value'
      ? a.value - b.value
      : a.change - b.change;
    
    return sortDirection === 'asc' ? compareValue : -compareValue;
  });

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Handle sort change
  const handleSortChange = (field: 'value' | 'change') => {
    if (sortBy === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc'); // Default to descending for new sort
    }
  };

  return (
    <div className="dashboard-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Top Holdings</h2>
        <div className="text-xs text-gray-500">Total: {formatCurrency(holdings.reduce((sum, item) => sum + item.value, 0))}</div>
      </div>
      
      {/* Table header */}
      <div className="flex justify-between items-center py-2 mb-2 border-b border-gray-200">
        <div className="text-xs font-medium text-gray-500" style={{ width: '40%' }}>Asset</div>
        
        <div 
          className="text-xs font-medium text-gray-500 flex items-center cursor-pointer" 
          style={{ width: '30%' }}
          onClick={() => handleSortChange('value')}
        >
          Value
          {sortBy === 'value' && (
            sortDirection === 'asc' 
              ? <ArrowUpwardIcon sx={{ fontSize: '0.875rem', marginLeft: '2px' }} />
              : <ArrowDownwardIcon sx={{ fontSize: '0.875rem', marginLeft: '2px' }} />
          )}
        </div>
        
        <div 
          className="text-xs font-medium text-gray-500 flex items-center cursor-pointer" 
          style={{ width: '30%', textAlign: 'right' }}
          onClick={() => handleSortChange('change')}
        >
          Change
          {sortBy === 'change' && (
            sortDirection === 'asc' 
              ? <ArrowUpwardIcon sx={{ fontSize: '0.875rem', marginLeft: '2px' }} />
              : <ArrowDownwardIcon sx={{ fontSize: '0.875rem', marginLeft: '2px' }} />
          )}
        </div>
      </div>
      
      {/* List of holdings */}
      <div className="overflow-auto" style={{ maxHeight: '280px' }}>
        {sortedHoldings.map((holding) => (
          <div 
            key={holding.id}
            className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center" style={{ width: '40%' }}>
              <div 
                className="w-2 h-2 mr-2 rounded-full" 
                style={{ backgroundColor: holding.color }}
              ></div>
              <div>
                <div className="text-sm font-medium">
                  {holding.name}
                </div>
                {holding.ticker && (
                  <div className="text-xs text-gray-500">
                    {holding.ticker}
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ width: '30%' }}>
              <div className="text-sm font-medium">
                {formatCurrency(holding.value)}
              </div>
            </div>
            
            <div 
              style={{ 
                width: '30%', 
                textAlign: 'right',
                color: holding.change > 0 
                  ? 'var(--success-color)' 
                  : holding.change < 0 
                    ? 'var(--error-color)' 
                    : 'var(--text-secondary)'
              }}
              className="text-sm font-medium flex items-center justify-end"
            >
              {holding.change > 0 ? '+' : ''}{holding.change}%
              <MoreVertIcon 
                sx={{ 
                  fontSize: '1rem', 
                  marginLeft: '4px',
                  color: 'var(--text-secondary)',
                  opacity: 0.5,
                  cursor: 'pointer'
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionList;