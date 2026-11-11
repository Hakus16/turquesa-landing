import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { ValueProps } from './components/home/ValueProps';
import { CatalogSection } from './components/catalog/CatalogSection';
import { AromasSection } from './components/home/AromasSection';
import { OrderSteps } from './components/home/OrderSteps';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { AdminPanel } from './components/admin/AdminPanel';
import { productService } from './services/productService';
import type { Product } from './types/product';

export const App: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return (
      window.location.pathname === '/admin' ||
      window.location.hash === '#admin'
    );
  });

  const [products, setProducts] = useState<Product[]>([]);

  const loadAllProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (e) {
      console.error('Error loading products in App:', e);
    }
  };

  useEffect(() => {
    loadAllProducts();

    const handleHashChange = () => {
      const isNowAdmin =
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin';
      setIsAdminView(isNowAdmin);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdminView) {
    return (
      <AdminPanel
        onExit={handleExitAdmin}
        onProductsChanged={loadAllProducts}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2723]">
      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <HeroSection />
        <ValueProps />
        <CatalogSection products={products} />
        <AromasSection />
        <OrderSteps />
      </main>

      {/* Footer & WhatsApp Floating Button */}
      <Footer onOpenAdmin={handleOpenAdmin} />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
