import React from 'react';
import { Flame, Phone, MapPin, Heart, ShieldCheck, Truck, Lock } from 'lucide-react';
import { BRAND_INFO } from '../../data/orderSteps';
import { createGeneralWhatsAppLink } from '../../utils/whatsappLink';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer id="contacto" className="bg-[#26211E] text-[#EBE6DF] pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-[#3D3530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 sm:pb-12 border-b border-[#3D3530]">
          
          {/* Brand info */}
          <div className="sm:col-span-2 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0D9488]/20 text-[#2DD4BF] flex items-center justify-center flex-shrink-0">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] font-semibold text-white uppercase">
                {BRAND_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#BDB5AB] max-w-md leading-relaxed font-light">
              Velas artesanales diseñadas para iluminar, aromatizar y transformar cualquier espacio en un refugio de paz. Hechas a mano con amor y cera vegetal de alta pureza.
            </p>
            <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#2DD4BF] bg-[#2DD4BF]/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                <span>50% anticipo de elaboración</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#2DD4BF] bg-[#2DD4BF]/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                <Truck className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Envíos a domicilio y recogida</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-white uppercase">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#BDB5AB]">
              <li>
                <a href="#inicio" className="hover:text-[#2DD4BF] transition-colors py-1 inline-block">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-[#2DD4BF] transition-colors py-1 inline-block">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <a href="#aromas" className="hover:text-[#2DD4BF] transition-colors py-1 inline-block">
                  Guía de Aromas & Esencias
                </a>
              </li>
              <li>
                <a href="#como-pedir" className="hover:text-[#2DD4BF] transition-colors py-1 inline-block">
                  Cómo Realizar tu Pedido
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto Directo */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-white uppercase">
              Pedidos & Atención
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#BDB5AB]">
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-[#2DD4BF] transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-[#0D9488]/20 flex items-center justify-center text-[#2DD4BF] group-hover:bg-[#0D9488] group-hover:text-white transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[10px] sm:text-xs text-[#BDB5AB]">WhatsApp Directo</div>
                  <div className="font-semibold text-xs sm:text-sm">{BRAND_INFO.phoneDisplay}</div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0D9488]/20 flex items-center justify-center text-[#2DD4BF] mt-0.5 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <p className="text-[11px] sm:text-xs text-[#BDB5AB] leading-relaxed">
                  Entregas a domicilio (el valor varía según ubicación) y punto de recogida coordinado previamente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#8A8177] gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Turquesa. Todos los derechos reservados. Decora tus espacios.</p>
          
          <div className="flex items-center gap-4">
            <p className="flex items-center justify-center gap-1.5">
              Creado con <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline flex-shrink-0" /> para los amantes de las velas
            </p>
            <span>•</span>
            <button
              onClick={onOpenAdmin || (() => { window.location.hash = '#admin'; })}
              className="inline-flex items-center gap-1 text-[#8A8177] hover:text-[#2DD4BF] transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Acceso Administrador</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
