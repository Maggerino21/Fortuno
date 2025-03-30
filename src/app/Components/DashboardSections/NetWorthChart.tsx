"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const NetWorthChart: React.FC = () => {
  // Mock data for net worth over time
  const data = [
    { month: 'Jan', netWorth: 98000 },
    { month: 'Feb', netWorth: 102000 },
    { month: 'Mar', netWorth: 104500 },
    { month: 'Apr', netWorth: 106200 },
    { month: 'May', netWorth: 110000 },
    { month: 'Jun', netWorth: 114500 },
    { month: 'Jul', netWorth: 120000 }
  ];

  // Format currency for the tooltip and axis
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            <span style={{ color: '#0070f3' }}>{formatCurrency(payload[0].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="net-worth-chart">
      <h3 className="chart-title">Net Worth Growth</h3>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="netWorth" 
              stroke="#0070f3" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorNetWorth)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NetWorthChart;