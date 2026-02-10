/**
 * Brutal Button Component
 * Bold, high-contrast button with thick borders and offset shadow
 */

import React from 'react';
import { colors, shadows, borders } from '@nc/design-system';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontFamily: 'inherit',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.background,
      border: borders.brutal,
      boxShadow: shadows.brutal,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.background,
      border: `4px solid ${colors.primary}`,
      boxShadow: shadows.brutal,
    },
    accent: {
      backgroundColor: colors.accent,
      color: colors.primary,
      border: `4px solid ${colors.primary}`,
      boxShadow: shadows.brutal,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: borders.brutal,
      boxShadow: 'none',
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '8px 16px',
      fontSize: '14px',
    },
    md: {
      padding: '12px 24px',
      fontSize: '16px',
    },
    lg: {
      padding: '16px 32px',
      fontSize: '18px',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      style={combinedStyles}
      className={clsx('brutal-button', className)}
      {...props}
    >
      {children}
    </button>
  );
};
