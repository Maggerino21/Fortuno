"use client";

import React, { useState, useEffect } from 'react';

interface CountingNumberProps {
  value?: number;
  duration?: number;
  start?: number;
  prefix?: string;
  renderWithSpans?: boolean;
}

const CountingNumber: React.FC<CountingNumberProps> = ({ 
  value = 0, 
  duration = 1000, 
  start = 0,
  prefix = '',
  renderWithSpans = false
}) => {
  const [displayValue, setDisplayValue] = useState(start);
  
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        const currentValue = Math.floor(
          start + (value - start) * (progress / duration)
        );
        setDisplayValue(currentValue);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, start]);

  // Format the number with commas
  const formattedValue = displayValue.toLocaleString();
  
  // Add the prefix and render with spans if requested
  if (renderWithSpans) {
    // Split the string into individual characters and wrap each in a span
    const textWithSpans = (prefix + formattedValue).split('').map((char, index) => (
      <span key={index} style={{ display: 'inline-block' }}>{char}</span>
    ));
    
    return <>{textWithSpans}</>;
  } else {
    return <>{prefix}{formattedValue}</>;
  }
};

export default CountingNumber;