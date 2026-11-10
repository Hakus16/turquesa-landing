import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { ValueProps } from './components/home/ValueProps';
import { CatalogSection } from './components/catalog/CatalogSection';
import { AromasSection } from './components/home/AromasSection';
import { OrderSteps } from './components/home/OrderSteps';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2723]">
      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <HeroSection />
        <ValueProps />
        <CatalogSection />
        <AromasSection />
        <OrderSteps />
      </main>

      {/* Footer & WhatsApp Floating Button */}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
