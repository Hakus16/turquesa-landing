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
import { DeviceActivationModal } from './components/admin/DeviceActivationModal';
import { productService } from './services/productService';
import { isDeviceAuthorized } from './services/deviceAuth';
import type { Product } from './types/product';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';

export const App: React.FC = () => {
  const checkAdminAccess = (): boolean => {
    const isTargetingAdmin =
      window.location.pathname === '/admin' ||
      window.location.hash === '#admin';

    // Must be on an authorized trusted device
    if (isTargetingAdmin && !isDeviceAuthorized()) {
      if (window.location.hash === '#admin') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return false;
    }
    return isTargetingAdmin && isDeviceAuthorized();
  };

  const [isAdminView, setIsAdminView] = useState<boolean>(() => checkAdminAccess());
  const [isActivatingDevice, setIsActivatingDevice] = useState<boolean>(() => {
    return (
      window.location.hash === '#activar-dispositivo' ||
      window.location.hash.startsWith('#admin-activate')
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
      const isActivation =
        window.location.hash === '#activar-dispositivo' ||
        window.location.hash.startsWith('#admin-activate');
      setIsActivatingDevice(isActivation);

      setIsAdminView(checkAdminAccess());
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleExitAdmin = () => {
    window.location.hash = '';
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
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
    <CartProvider>
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

        {/* Footer (without any visible admin buttons) & Floating Actions */}
        <Footer />
        <FloatingWhatsApp />

        {/* Slide-over Shopping Cart Drawer */}
        <CartDrawer />

        {/* Device Activation Modal (Only shown via secret #activar-dispositivo link) */}
        {isActivatingDevice && (
          <DeviceActivationModal
            onSuccess={() => {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
              setIsActivatingDevice(false);
              window.location.hash = '#admin';
              setIsAdminView(true);
            }}
            onCancel={() => {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
              setIsActivatingDevice(false);
            }}
          />
        )}
      </div>
    </CartProvider>
  );
};

export default App;
