import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import type { CategoryId } from '../../types/product';

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
      
      {/* Search & Results Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Search input */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="w-4 h-4 text-[#7A7065] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por vela (ej. Mandarina, Arcos)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] placeholder-[#7A7065]/70 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] transition-all"
          />
        </div>

        {/* Counter */}
        <div className="text-xs text-[#7A7065] font-medium text-right sm:text-left">
          Mostrando <span className="font-bold text-[#0D9488]">{totalResults}</span> {totalResults === 1 ? 'diseño' : 'diseños'}
        </div>
      </div>

      {/* Category Tabs with responsive horizontal scroll on mobile/tablets */}
      <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border flex-shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-sm'
                    : 'bg-[#F4EFE6] text-[#2D2723] border-[#E4D9C9] hover:bg-[#EAE2D5]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
