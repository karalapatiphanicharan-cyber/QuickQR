import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 text-center lg:text-left overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="aurora-blur w-[600px] h-[600px] bg-primary/20 -top-40 -left-20"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1.1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        className="aurora-blur w-[500px] h-[500px] bg-secondary/15 top-40 right-20"
      ></motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Generate QR Codes <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-DEFAULT">Instantly</span>
          </h1>
          <p className="text-lg lg:text-xl text-[#94A3B8] max-w-xl leading-relaxed">
            Generate QR codes instantly from text and URLs. Fast, simple, and built for everyday use.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
