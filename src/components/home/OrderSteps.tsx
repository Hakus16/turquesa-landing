import React from 'react';
import { Sparkles, Palette, ShieldCheck, Truck, PhoneCall } from 'lucide-react';
import { ORDER_STEPS, BRAND_INFO } from '../../data/orderSteps';
import { CANDLE_COLORS } from '../../data/colors';
import { createGeneralWhatsAppLink } from '../../utils/whatsappLink';

export const OrderSteps: React.FC = () => {
  const stepIcons = [Sparkles, Palette, ShieldCheck, Truck];

  return (
    <section id="como-pedir" className="py-14 sm:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2723] tracking-tight mb-3 sm:mb-4">
            Cómo Realizar tu Pedido
          </h2>
          <p className="text-xs sm:text-base text-[#7A7065] font-light leading-relaxed px-2 sm:px-0">
            Sigue estos 4 sencillos pasos para ordenar tus velas personalizadas y tenerlas listas para ambientar tu hogar o regalar:
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {ORDER_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Sparkles;
            return (
              <div
                key={step.step}
                className="relative bg-[#F4EFE6] rounded-2xl p-5 sm:p-6 border border-[#E4D9C9] flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow">
                    {step.step}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#0D9488] bg-[#0D9488]/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                    {step.badgeText}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1.5 sm:space-y-2 mb-3.5 sm:mb-4">
                  <div className="flex items-center gap-2 text-[#2D2723]">
                    <Icon className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                    <h3 className="font-serif text-base sm:text-lg font-bold">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#7A7065] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Detail Box */}
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E4D9C9] text-[11px] text-[#7A7065] leading-relaxed">
                  <div>{step.detail}</div>
                  {step.step === 2 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-[#E4D9C9]">
                      {CANDLE_COLORS.map((c) => (
                        <span
                          key={c.id}
                          title={c.name}
                          className={`w-3.5 h-3.5 rounded-full border shadow-inner ${c.borderClass || 'border-black/10'}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                      <span className="text-[10px] text-[#0D9488] font-semibold ml-1">8 colores</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Callout Banner with Contact & Payment details */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#26211E] to-[#3A332E] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-[#4A413B]">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#2DD4BF] font-semibold">
                Atención Inmediata
              </span>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold">
                ¿Tienes dudas con tu diseño o aroma?
              </h3>
              <p className="text-xs sm:text-sm text-[#D8CEBE] max-w-xl font-light leading-relaxed">
                Te asesoramos directamente por WhatsApp para definir colores, esencias y cotizar envíos a tu ciudad o punto de entrega.
              </p>
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4 flex-shrink-0" />
                <span>Escríbenos: {BRAND_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
