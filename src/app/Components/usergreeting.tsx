"use client";

import React from 'react';

interface UserGreetingProps {
  username?: string;
}

const UserGreeting: React.FC<UserGreetingProps> = ({ username = 'Guest' }) => {
  const currentHour = new Date().getHours();
  let greeting = 'Hello';
  
  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  
  return (
    <div className="user-greeting">
      {greeting}, <span className="username">{username}</span>
    </div>
  );
};

export default UserGreeting;