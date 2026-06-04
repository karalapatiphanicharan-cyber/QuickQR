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
          "flex w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:outline-none text-white placeholder:text-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
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
          "flex w-full bg-[#0F172A] border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary focus:outline-none text-white placeholder:text-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
