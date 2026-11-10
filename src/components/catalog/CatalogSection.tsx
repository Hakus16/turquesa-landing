import React, { useState, useMemo } from 'react';
import { PackageOpen } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import type { CategoryId, Product } from '../../types/product';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';
import { OrderModal } from './OrderModal';

export const CatalogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'todos' || product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.size && product.size.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2723] tracking-tight mb-4">
            Catálogo de Velas
          </h2>
          <p className="text-sm sm:text-base text-[#7A7065] font-light leading-relaxed">
            Explora cada silueta, medida y precio. Puedes personalizar cada diseño con tu fragancia y tonalidad favorita.
          </p>
        </div>

        {/* Filter and Search */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F4EFE6] rounded-3xl border border-[#E4D9C9] p-8">
            <PackageOpen className="w-12 h-12 text-[#7A7065] mx-auto mb-3 stroke-[1.5]" />
            <h3 className="font-serif text-xl font-bold text-[#2D2723] mb-1">
              No encontramos velas con ese criterio
            </h3>
            <p className="text-xs sm:text-sm text-[#7A7065] mb-4">
              Prueba buscando con otra palabra o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-[#0D9488] text-white text-xs font-semibold hover:bg-[#0F766E] transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        )}

      </div>

      {/* Modal for order customization */}
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
