import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-6 border-t border-white/5 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl font-bold tracking-tighter text-foreground">QuickQR</span>
          <p className="text-foreground/50 text-sm">© 2024 QuickQR. Precision generation for modern creators.</p>
        </div>
        <div className="flex gap-8 text-foreground/50 text-sm">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
};
