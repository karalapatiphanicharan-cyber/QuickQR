import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QRGenerator } from './components/QRGenerator';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <QRGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
