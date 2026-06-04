import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-background/50 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(173,198,255,0.1)]">
      <div className="flex items-center gap-8">
        <span className="font-display text-2xl font-bold tracking-tighter text-foreground">QuickQR</span>
      </div>
    </nav>
  );
};
