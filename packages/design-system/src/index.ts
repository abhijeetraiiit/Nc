/**
 * Neubrutalism Design System
 * Bold, high-contrast design tokens for modern e-commerce
 */

export const colors = {
  primary: '#000000',
  secondary: '#FF3366',
  accent: '#00FF88',
  warning: '#FFD700',
  background: '#FFFFFF',
  error: '#FF0000',
  success: '#00FF88',
  info: '#0099FF',
  
  // Grays
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const shadows = {
  brutal: '8px 8px 0px #000000',
  brutalSm: '4px 4px 0px #000000',
  brutalLg: '12px 12px 0px #000000',
  brutalXl: '16px 16px 0px #000000',
  
  // Colored shadows
  brutalSecondary: '8px 8px 0px #FF3366',
  brutalAccent: '8px 8px 0px #00FF88',
};

export const borders = {
  brutal: '4px solid #000000',
  brutalThick: '6px solid #000000',
  brutalThin: '2px solid #000000',
};

export const typography = {
  fontFamily: {
    primary: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  modal: '100',
  popover: '200',
  tooltip: '300',
  notification: '400',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Tailwind config extension
export const tailwindTheme = {
  colors,
  boxShadow: shadows,
  borderWidth: borders,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  fontWeight: typography.fontWeight,
  lineHeight: typography.lineHeight,
  spacing,
  borderRadius,
  screens: breakpoints,
  zIndex,
  transitionDuration: transitions,
};

export default {
  colors,
  shadows,
  borders,
  typography,
  spacing,
  borderRadius,
  breakpoints,
  zIndex,
  transitions,
  tailwindTheme,
};
