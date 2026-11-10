import React from 'react';
import { Sparkles, ArrowDown, ShoppingBag, Flame } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../../utils/whatsappLink';

export const HeroSection: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Subtle organic background gradient circles */}
      <div className="absolute top-12 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#B88A58]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EAE2D5] border border-[#D8CEBE] text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#7A7065]">
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Colección Artesanal 2026</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2D2723] leading-[1.12] sm:leading-[1.08]">
              Decora tus <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#0D9488]"> espacios </span> con luz & aroma.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#7A7065] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Velas artesanales diseñadas para crear atmósferas acogedoras. Elige tu diseño favorito, personaliza el color y disfruta de esencias botánicas únicas como café, coco o eucalipto.
            </p>

            {/* Responsive CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#catalogo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0D9488] text-white font-medium shadow-md hover:bg-[#0F766E] hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explorar Catálogo</span>
              </a>

              <a
                href={createGeneralWhatsAppLink('¡Hola! Me gustaría conocer la disponibilidad de las velas artesanales Turquesa.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#2D2723] font-medium border border-[#E4D9C9] shadow-sm hover:bg-[#F4EFE6] transition-all duration-300 text-sm sm:text-base"
              >
                <span>Asesoría Personalizada</span>
              </a>
            </div>

            {/* Feature highlights */}
            <div className="pt-5 sm:pt-6 border-t border-[#E4D9C9] grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#2D2723]">100%</div>
                <div className="text-[11px] sm:text-xs text-[#7A7065]">Artesanal a Mano</div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#2D2723]">7+</div>
                <div className="text-[11px] sm:text-xs text-[#7A7065]">Aromas Exclusivos</div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#2D2723]">50%</div>
                <div className="text-[11px] sm:text-xs text-[#7A7065]">Abono para Iniciar</div>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative max-w-sm sm:max-w-md lg:max-w-lg w-full">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-[#0D9488]/20 via-[#B88A58]/20 to-transparent rounded-3xl blur-lg transform -rotate-1" />

              {/* Main Card with the real catalog photo */}
              <div className="relative bg-[#F4EFE6] rounded-2xl overflow-hidden border border-[#E4D9C9] shadow-xl p-2.5 sm:p-4">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E8DEC8]">
                  <img
                    src="/images/hero-candles.png"
                    alt="Velas decorativas artesanales Turquesa"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/90 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 border border-white/60 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0">
                        <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0D9488]" />
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-[#2D2723]">Velas Decorativas</div>
                        <div className="text-[10px] sm:text-[11px] text-[#7A7065]">Desde $3.000 COP</div>
                      </div>
                    </div>
                    <a
                      href="#catalogo"
                      className="text-xs font-semibold text-[#0D9488] hover:text-[#0F766E] flex items-center gap-1"
                    >
                      <span>Ver todas</span>
                      <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Accent Floating Tag */}
              <div className="hidden sm:flex absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-[#FAF7F2] border border-[#E4D9C9] rounded-2xl px-3.5 py-2 shadow-lg items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse"></span>
                <span className="text-xs font-semibold text-[#2D2723]">Aromas & Diseños a tu Gusto</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
