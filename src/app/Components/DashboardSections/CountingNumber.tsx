import React, { useState, useEffect } from 'react';

interface CountingNumberProps {
  value?: number;
  duration?: number;
  start?: number;
  prefix?: string;
}

const CountingNumber: React.FC<CountingNumberProps> = ({ 
  value = 0, 
  duration = 1000, 
  start = 0,
  prefix = ''
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

  return <span>{prefix}{displayValue.toLocaleString()}</span>;
};

export default CountingNumber;