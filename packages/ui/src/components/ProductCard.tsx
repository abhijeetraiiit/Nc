'use client';

/**
 * Product Card Component
 * Neubrutalism-style product display card
 */

import React from 'react';
import { colors, shadows, borders } from '@nc/design-system';
import clsx from 'clsx';

export interface ProductCardProps {
  title: string;
  price: number;
  mrp?: number;
  image: string;
  badge?: string;
  onQuickView?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  mrp,
  image,
  badge,
  onQuickView,
  className,
}) => {
  const cardStyle: React.CSSProperties = {
    border: borders.brutal,
    backgroundColor: colors.background,
    boxShadow: shadows.brutal,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 150ms ease',
  };

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    overflow: 'hidden',
    backgroundColor: colors.gray[100],
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const contentStyle: React.CSSProperties = {
    padding: '16px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: colors.primary,
  };

  const priceContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const priceStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: colors.primary,
  };

  const mrpStyle: React.CSSProperties = {
    fontSize: '14px',
    color: colors.gray[500],
    textDecoration: 'line-through',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: colors.accent,
    color: colors.primary,
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
    border: `2px solid ${colors.primary}`,
  };

  const discount = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div
      style={cardStyle}
      className={clsx('product-card', className)}
      onClick={onQuickView}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translate(-4px, -4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)';
      }}
    >
      <div style={imageContainerStyle}>
        <img src={image} alt={title} style={imageStyle} />
        {badge && <div style={badgeStyle}>{badge}</div>}
        {discount > 0 && !badge && (
          <div style={badgeStyle}>{discount}% OFF</div>
        )}
      </div>
      <div style={contentStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={priceContainerStyle}>
          <span style={priceStyle}>₹{price.toLocaleString('en-IN')}</span>
          {mrp && mrp > price && (
            <span style={mrpStyle}>₹{mrp.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
};
