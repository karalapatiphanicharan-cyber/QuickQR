import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-surface-container-highest border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:outline-none text-foreground placeholder:text-foreground/50 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full bg-surface-container-highest border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:outline-none text-foreground placeholder:text-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
