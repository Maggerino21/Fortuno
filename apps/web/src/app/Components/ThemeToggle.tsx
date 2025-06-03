// apps/web/src/app/Components/ThemeToggle.tsx
'use client';

import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { 
  LightMode, 
  DarkMode, 
  Palette,
  AutoAwesome 
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  // Get icon based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <LightMode />;
      case 'dark':
        return <DarkMode />;
      case 'fortune':
        return <AutoAwesome />;
      default:
        return <Palette />;
    }
  };

  // Get tooltip text
  const getTooltipText = () => {
    switch (theme) {
      case 'light':
        return 'Switch to Dark Theme';
      case 'dark':
        return 'Switch to Fortune Theme';
      case 'fortune':
        return 'Switch to Light Theme';
      default:
        return 'Change Theme';
    }
  };

  return (
    <Tooltip title={getTooltipText()} arrow>
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1200,
          backgroundColor: 'background.paper',
          border: `1px solid ${muiTheme.palette.divider}`,
          boxShadow: muiTheme.shadows[2],
          '&:hover': {
            backgroundColor: 'background.default',
            boxShadow: muiTheme.shadows[4],
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
        size="medium"
        aria-label="Toggle theme"
      >
        {getThemeIcon()}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;