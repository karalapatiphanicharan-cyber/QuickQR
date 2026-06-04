import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 text-center lg:text-left">
      <div className="aurora-blur w-[500px] h-[500px] bg-primary/20 -top-20 -left-20"></div>
      <div className="aurora-blur w-[400px] h-[400px] bg-secondary/15 top-40 right-20"></div>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-foreground leading-tight">
            Generate QR Codes <span className="text-primary">Instantly</span>
          </h1>
          <p className="text-lg lg:text-xl text-foreground/70 max-w-xl">
            Convert text, URLs, PDF files, and images into high-precision QR codes in seconds with our advanced glassmorphic engine.
          </p>
        </div>
      </div>
    </section>
  );
};
