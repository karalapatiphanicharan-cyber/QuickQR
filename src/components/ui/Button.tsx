import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variant === 'primary' && 'bg-primary text-on-primary hover:shadow-[0_0_25px_rgba(173,198,255,0.6)] hover:scale-[1.02]',
          variant === 'secondary' && 'bg-white/5 text-white border border-white/10 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02]',
          variant === 'ghost' && 'bg-transparent text-foreground hover:bg-white/10',
          size === 'sm' && 'px-4 py-2 text-xs',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          className
        )}
        {...props}
      />
    );
  }
);
