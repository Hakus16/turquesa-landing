import React from 'react';
import { HeartHandshake, Sparkles, Palette, Clock } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: HeartHandshake,
      title: 'Elaboración 100% Artesanal',
      description: 'Cada vela se vierte y esculpe a mano, logrando piezas únicas con acabados impecables.',
    },
    {
      icon: Sparkles,
      title: 'Fragancias Envolventes',
      description: 'Aceites aromáticos de alta pureza que perfuman suavemente tu espacio incluso sin encender.',
    },
    {
      icon: Palette,
      title: 'Personaliza Color y Aroma',
      description: 'Elige la combinación de diseño, tonalidad y aroma que mejor combine con tu rincón favorito.',
    },
    {
      icon: Clock,
      title: 'Elaboración Bajo Pedido',
      description: 'Iniciamos tu orden con el 50% de anticipo para garantizar frescura aromática y máxima dedicación.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F4EFE6]/70 border-y border-[#E4D9C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E4D9C9]/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D2723] mb-1.5 sm:mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A7065] leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
