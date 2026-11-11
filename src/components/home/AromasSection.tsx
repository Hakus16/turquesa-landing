import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { AROMAS } from '../../data/aromas';
import type { Aroma } from '../../types/product';

interface AromasSectionProps {
  onSelectAroma?: (aroma: Aroma) => void;
}

export const AromasSection: React.FC<AromasSectionProps> = ({ onSelectAroma }) => {
  const [selectedAroma, setSelectedAroma] = useState<Aroma>(AROMAS[0]);

  return (
    <section id="aromas" className="py-14 sm:py-20 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2723] tracking-tight mb-3 sm:mb-4">
            Nuestras Esencias & Aromas
          </h2>
          <p className="text-xs sm:text-base text-[#7A7065] font-light leading-relaxed px-2 sm:px-0">
            Personaliza cualquiera de nuestras velas con el aroma que evoque tu recuerdo o estado de ánimo favorito. Selecciona una esencia para conocer sus detalles:
          </p>
        </div>

        {/* Aroma Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-10 max-w-4xl mx-auto">
          {AROMAS.map((aroma) => {
            const isSelected = selectedAroma.id === aroma.id;
            return (
              <button
                key={aroma.id}
                onClick={() => {
                  setSelectedAroma(aroma);
                  onSelectAroma?.(aroma);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border active:scale-95 ${
                  isSelected
                    ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-md scale-105'
                    : 'bg-[#F4EFE6] text-[#2D2723] border-[#E4D9C9] hover:bg-[#EAE2D5]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] flex-shrink-0" />}
                <span>{aroma.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Aroma Featured Showcase */}
        <div className="max-w-3xl mx-auto bg-[#F4EFE6] rounded-2xl sm:rounded-3xl border border-[#E4D9C9] p-5 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 sm:w-48 h-36 sm:h-48 bg-[#0D9488]/5 rounded-bl-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 mb-5 sm:mb-6">
            <div>
              <span className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold mb-2 ${selectedAroma.badgeBg}`}>
                {selectedAroma.mood}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D2723]">
                {selectedAroma.name}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7A7065] block">Intensidad</span>
              <span className="text-xs sm:text-sm font-bold text-[#0D9488] flex items-center gap-1 sm:justify-end">
                <Sparkles className="w-3.5 h-3.5" />
                {selectedAroma.intensity}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-base text-[#7A7065] leading-relaxed mb-6 sm:mb-8 font-light">
            {selectedAroma.description}
          </p>

          <div className="pt-5 sm:pt-6 border-t border-[#E4D9C9] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="text-xs text-[#7A7065] font-light">
              ✨ Disponible para personalizar cualquiera de los diseños de velas de nuestro catálogo.
            </span>
            <a
              href="#catalogo"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D9488] hover:text-[#0F766E] transition-colors"
            >
              <span>Explorar catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
