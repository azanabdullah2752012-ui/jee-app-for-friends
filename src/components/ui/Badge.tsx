import React from 'react';
import { clsx } from 'clsx';
import type { SubjectType } from '../../types';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'physics' | 'chemistry' | 'maths' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold rounded-full',
    md: 'px-3 py-1 text-xs font-bold rounded-lg',
  };

  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700/60',
    physics: 'bg-violet-950/80 text-violet-300 border border-violet-700/50 shadow-xs shadow-violet-900/30',
    chemistry: 'bg-amber-950/80 text-amber-300 border border-amber-700/50 shadow-xs shadow-amber-900/30',
    maths: 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 shadow-xs shadow-emerald-900/30',
    success: 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60',
    warning: 'bg-amber-950/80 text-amber-400 border border-amber-800/60',
    danger: 'bg-rose-950/80 text-rose-400 border border-rose-800/60',
    info: 'bg-sky-950/80 text-sky-400 border border-sky-800/60',
  };

  return (
    <span className={clsx('inline-flex items-center gap-1.5 tracking-wide', sizeStyles[size], variantStyles[variant], className)}>
      {children}
    </span>
  );
};

export const getSubjectBadgeVariant = (subject: SubjectType): 'physics' | 'chemistry' | 'maths' => {
  switch (subject) {
    case 'Physics':
      return 'physics';
    case 'Chemistry':
      return 'chemistry';
    case 'Mathematics':
      return 'maths';
    default:
      return 'physics';
  }
};
