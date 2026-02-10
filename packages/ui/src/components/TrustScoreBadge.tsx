'use client';

/**
 * Trust Score Badge Component
 * Displays vendor trust score with visual indicator
 */

import React from 'react';
import { colors, borders } from '@nc/design-system';

export interface TrustScoreBadgeProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true,
}) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.warning;
    return colors.error;
  };

  const sizeMap = {
    sm: { fontSize: '12px', padding: '4px 8px' },
    md: { fontSize: '14px', padding: '6px 12px' },
    lg: { fontSize: '16px', padding: '8px 16px' },
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: getScoreColor(score),
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
    fontWeight: 'bold',
    ...sizeMap[size],
  };

  const scoreText = score >= 80 ? 'Trusted' : score >= 60 ? 'Good' : 'Fair';

  return (
    <div style={badgeStyle} className="trust-score-badge">
      <span>{score}/100</span>
      {showLabel && <span>{scoreText}</span>}
    </div>
  );
};
