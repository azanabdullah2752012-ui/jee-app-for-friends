import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glow?: 'none' | 'purple' | 'blue' | 'amber';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glow = 'none',
  padding = 'md',
  className,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const glowStyles = {
    none: '',
    purple: 'shadow-lg shadow-violet-900/10 border-violet-500/20',
    blue: 'shadow-lg shadow-blue-900/10 border-blue-500/20',
    amber: 'shadow-lg shadow-amber-900/10 border-amber-500/20',
  };

  return (
    <div
      className={clsx(
        'bg-[#131B2E]/70 backdrop-blur-md border border-slate-800/80 rounded-2xl text-slate-100 transition-all duration-200 relative overflow-hidden',
        paddingStyles[padding],
        glowStyles[glow],
        hoverEffect && 'hover:bg-[#18233D]/80 hover:border-slate-700/80 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-950/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
