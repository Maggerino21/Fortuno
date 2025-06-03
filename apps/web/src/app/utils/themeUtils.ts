// apps/web/src/app/utils/themeUtils.ts
import { designTokens, type ThemeVariant } from '../theme';

/**
 * Get color value from design tokens
 */
export const getColor = (colorPath: string, shade: number = 500) => {
  const pathParts = colorPath.split('.');
  let color: any = designTokens.colors;
  
  for (const part of pathParts) {
    color = color[part];
    if (!color) return undefined;
  }
  
  return color[shade] || color;
};

/**
 * Get responsive font size
 */
export const getFontSize = (size: keyof typeof designTokens.typography.fontSize) => {
  return designTokens.typography.fontSize[size];
};

/**
 * Get spacing value
 */
export const getSpacing = (size: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[size];
};

/**
 * Generate theme-aware gradient
 */
export const createGradient = (
  direction: string = '135deg',
  colors: string[] = ['primary.500', 'primary.300', 'secondary.500']
) => {
  const gradientColors = colors.map(color => {
    if (color.includes('.')) {
      const [colorName, shade] = color.split('.');
      return getColor(colorName, parseInt(shade));
    }
    return color;
  }).join(', ');
  
  return `linear-gradient(${direction}, ${gradientColors})`;
};

/**
 * Theme-aware shadow generator
 */
export const getShadow = (level: keyof typeof designTokens.shadows) => {
  return designTokens.shadows[level];
};

/**
 * Responsive breakpoint utility
 */
export const breakpoints = {
  xs: '(max-width: 475px)',
  sm: '(max-width: 640px)',
  md: '(max-width: 768px)',
  lg: '(max-width: 1024px)',
  xl: '(max-width: 1280px)',
  '2xl': '(max-width: 1536px)',
};

/**
 * Media query helper
 */
export const mediaQuery = (breakpoint: keyof typeof breakpoints) => {
  return `@media ${breakpoints[breakpoint]}`;
};

/**
 * Color manipulation utilities
 */
export const colorUtils = {
  /**
   * Convert hex to rgba
   */
  hexToRgba: (hex: string, alpha: number = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
  
  /**
   * Lighten a color
   */
  lighten: (color: string, amount: number = 0.1) => {
    // This is a simplified version - you might want to use a library like polished
    return `color-mix(in srgb, ${color} ${(1 - amount) * 100}%, white)`;
  },
  
  /**
   * Darken a color
   */
  darken: (color: string, amount: number = 0.1) => {
    return `color-mix(in srgb, ${color} ${(1 - amount) * 100}%, black)`;
  }
};

/**
 * Animation utilities
 */
export const animations = {
  fadeIn: {
    animation: 'fadeIn 0.3s ease-in-out',
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    }
  },
  slideUp: {
    animation: 'slideUp 0.4s ease-out',
    '@keyframes slideUp': {
      from: { 
        opacity: 0,
        transform: 'translateY(20px)'
      },
      to: { 
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  },
  pulse: {
    animation: 'pulse 2s ease-in-out infinite',
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.8 }
    }
  },
  shimmer: {
    animation: 'shimmer 2.5s ease-in-out infinite linear',
    '@keyframes shimmer': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' }
    }
  }
};

/**
 * CSS-in-JS theme object for styled-components or emotion
 */
export const createStyledTheme = (variant: ThemeVariant) => ({
  colors: designTokens.colors,
  typography: designTokens.typography,
  spacing: designTokens.spacing,
  borderRadius: designTokens.borderRadius,
  shadows: designTokens.shadows,
  breakpoints,
  utils: {
    getColor,
    getFontSize,
    getSpacing,
    getShadow,
    colorUtils,
    animations
  }
});