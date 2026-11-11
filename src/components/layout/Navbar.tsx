import React, { useState, useEffect } from 'react';
import { Flame, Menu, X, MessageCircle, ShoppingBag } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../../utils/whatsappLink';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalItemsCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Aromas', href: '#aromas' },
    { label: 'Cómo Pedir', href: '#como-pedir' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E4D9C9]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 sm:gap-2.5 group"
            >
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center group-hover:bg-[#0D9488] group-hover:text-white transition-all duration-300 flex-shrink-0">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-[#2D2723] uppercase">
                  Turquesa
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#7A7065] -mt-0.5 sm:-mt-1 font-medium">
                  Velas Artesanales
                </span>
              </div>
            </a>

            {/* Desktop / Tablet Landscape Nav */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs lg:text-sm font-medium text-[#2D2723]/80 hover:text-[#0D9488] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0D9488] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* WhatsApp CTA Button & Cart (Tablet & Desktop) */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                type="button"
                onClick={openCart}
                className="relative p-2.5 rounded-full text-[#2D2723] hover:text-[#0D9488] hover:bg-[#EAE2D5] transition-colors"
                aria-label={`Abrir carrito con ${totalItemsCount} velas`}
                title="Ver carrito de compras"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0D9488] text-white text-[10px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in-75">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0D9488] text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-[#0F766E] hover:shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Hacer Pedido</span>
              </a>
            </div>

            {/* Mobile Actions: Cart & Menu Toggle */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 rounded-xl text-[#2D2723] hover:bg-[#E4D9C9]/50 transition-colors"
                aria-label={`Abrir carrito con ${totalItemsCount} velas`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#0D9488] text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-sm">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#2D2723] hover:bg-[#E4D9C9]/50 transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E4D9C9] px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            {/* Quick access to cart in mobile menu */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-[#2D2723] hover:text-[#0D9488] hover:bg-[#F4EFE6] rounded-xl transition-colors text-left"
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#0D9488]" />
                <span>Mi Carrito</span>
              </span>
              {totalItemsCount > 0 ? (
                <span className="bg-[#0D9488] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {totalItemsCount} {totalItemsCount === 1 ? 'vela' : 'velas'}
                </span>
              ) : (
                <span className="text-xs text-[#7A7065] font-light">Vacío</span>
              )}
            </button>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-[#2D2723] hover:text-[#0D9488] hover:bg-[#F4EFE6] rounded-xl transition-colors active:bg-[#EAE2D5]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E4D9C9]/60">
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-full bg-[#0D9488] text-white text-sm font-semibold shadow hover:bg-[#0F766E] transition-colors active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </>
  );
};
