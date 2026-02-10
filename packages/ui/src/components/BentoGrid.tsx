/**
 * Bento Grid Component
 * Modern grid layout for content organization
 */

import React from 'react';
import clsx from 'clsx';

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: number;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className,
  columns = 3,
  gap = 16,
}) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
    gap: `${gap}px`,
  };

  return (
    <div style={gridStyle} className={clsx('bento-grid', className)}>
      {children}
    </div>
  );
};

export interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  span?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export const BentoItem: React.FC<BentoItemProps> = ({
  children,
  className,
  span = 1,
  rowSpan = 1,
}) => {
  const itemStyle: React.CSSProperties = {
    gridColumn: `span ${span}`,
    gridRow: `span ${rowSpan}`,
    border: '4px solid #000',
    padding: '24px',
    backgroundColor: '#fff',
    boxShadow: '8px 8px 0px #000',
  };

  return (
    <div style={itemStyle} className={clsx('bento-item', className)}>
      {children}
    </div>
  );
};
