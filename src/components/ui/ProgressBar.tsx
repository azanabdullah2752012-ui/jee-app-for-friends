import React from 'react';
import { clsx } from 'clsx';
import type { SubjectType } from '../../types';

export interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: 'violet' | 'amber' | 'emerald' | 'blue' | 'gradient';
  subject?: SubjectType;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'violet',
  subject,
  showLabel = false,
  height = 'md',
  className,
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  let barGradient = 'from-violet-500 to-indigo-500';

  if (subject === 'Physics') {
    barGradient = 'from-violet-500 via-purple-500 to-indigo-500';
  } else if (subject === 'Chemistry') {
    barGradient = 'from-amber-500 via-orange-500 to-yellow-500';
  } else if (subject === 'Mathematics') {
    barGradient = 'from-emerald-500 via-teal-500 to-green-500';
  } else if (color === 'amber') {
    barGradient = 'from-amber-500 to-orange-500';
  } else if (color === 'emerald') {
    barGradient = 'from-emerald-500 to-teal-500';
  } else if (color === 'blue') {
    barGradient = 'from-blue-500 to-cyan-500';
  } else if (color === 'gradient') {
    barGradient = 'from-violet-500 via-indigo-500 to-blue-500';
  }

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs mb-1.5 text-slate-400 font-medium">
          <span>Progress</span>
          <span className="text-slate-200 font-semibold">{clampedProgress}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/40', heightStyles[height])}>
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r shadow-xs',
            barGradient
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
