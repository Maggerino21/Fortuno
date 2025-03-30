// RechartsDistribution.tsx
"use client"
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

const RechartsDistribution = () => {
  // State for active index (for hover effects)
  const [activeIndex, setActiveIndex] = useState(-1);

  // Colors that match the holographic gradient style
  const COLORS = [
    '#6366f1', // Indigo
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#14b8a6', // Teal
  ];

  // Mock data for net worth distribution
  const netWorthSources: DataItem[] = [
    { name: 'Real Estate', value: 40 },
    { name: 'Investments', value: 30 },
    { name: 'Cash', value: 15 },
    { name: 'Other Assets', value: 15 }
  ];

  // Active shape for hover effect
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.9}
        />
      </g>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '300px' }}>
      {/* Chart first - make it larger */}
      <div style={{ width: '100%', height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={netWorthSources}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              animationDuration={1200}
              isAnimationActive={true}
            >
              {netWorthSources.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    filter: activeIndex === index ? 
                      'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))' : 
                      'none',
                    transition: 'filter 0.3s ease'
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend below the chart */}
      <div className="pie-legend" style={{ marginTop: '1rem' }}>
        {netWorthSources.map((source, index) => (
          <div 
            key={index} 
            className="legend-item"
            style={{ 
              opacity: activeIndex === -1 || activeIndex === index ? 1 : 0.5,
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            <span 
              className="legend-color" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="legend-label">
              {source.name}: {source.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RechartsDistribution;