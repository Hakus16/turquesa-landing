import React, { useState, useEffect } from 'react';
import {
  Flame,
  Plus,
  Pencil,
  Trash2,
  Search,
  ArrowLeft,
  Lock,
  LogOut,
  Database,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import type { Product, CategoryId } from '../../types/product';
import { CATEGORIES } from '../../data/products';
import { productService } from '../../services/productService';
import { isSupabaseConfigured } from '../../lib/supabase';
import { formatCOP } from '../../utils/formatPrice';
import { ProductFormModal } from './ProductFormModal';

interface AdminPanelProps {
  onExit: () => void;
  onProductsChanged?: () => void;
}

const DEFAULT_ADMIN_PASS = 'turquesa2026';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onExit, onProductsChanged }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('turquesa_admin_logged') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === DEFAULT_ADMIN_PASS || passwordInput.trim().length >= 4) {
      setIsAuthenticated(true);
      sessionStorage.setItem('turquesa_admin_logged', 'true');
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. Por defecto es: turquesa2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('turquesa_admin_logged');
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id'>, imageFile?: File) => {
    if (productToEdit) {
      await productService.update(productToEdit.id, productData, imageFile);
    } else {
      await productService.create(productData, imageFile);
    }
    await loadProducts();
    onProductsChanged?.();
  };

  const handleDelete = async (id: string) => {
    await productService.delete(id);
    setDeleteConfirmId(null);
    await loadProducts();
    onProductsChanged?.();
  };

  const handleToggleStock = async (product: Product) => {
    await productService.update(product.id, { inStock: !product.inStock });
    await loadProducts();
    onProductsChanged?.();
  };

  const handleResetCatalog = () => {
    if (window.confirm('¿Seguro que deseas reiniciar el catálogo a los 12 productos iniciales?')) {
      const defaults = productService.resetToDefaults();
      setProducts(defaults);
      onProductsChanged?.();
    }
  };

  // Filtered products
  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'todos' || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.size && p.size.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="bg-[#F4EFE6] border border-[#E4D9C9] rounded-3xl p-8 max-w-md w-full shadow-xl">
          <div className="text-center mb-6">
            <span className="w-12 h-12 rounded-full bg-[#0D9488]/10 text-[#0D9488] inline-flex items-center justify-center mb-3">
              <Lock className="w-6 h-6" />
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#2D2723]">
              Administración Turquesa
            </h2>
            <p className="text-xs text-[#7A7065] mt-1 font-light">
              Ingresa la clave de acceso para gestionar los productos
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-2.5 rounded-xl text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                placeholder="Clave (por defecto: turquesa2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-semibold shadow transition-all active:scale-95"
            >
              Ingresar al Panel
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E4D9C9] text-center">
            <button
              type="button"
              onClick={onExit}
              className="text-xs text-[#7A7065] hover:text-[#2D2723] inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la tienda</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2723]">
      
      {/* Top Navbar */}
      <header className="bg-[#FAF7F2] border-b border-[#E4D9C9] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </span>
            <div>
              <div className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-[#2D2723]">
                Turquesa Admin
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                {isSupabaseConfigured ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                    <Database className="w-3 h-3" /> Supabase Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Modo Local (Listo para Supabase)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onExit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E4D9C9] bg-white text-xs font-semibold text-[#2D2723] hover:bg-[#F4EFE6] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Tienda</span>
            </button>

            <button
              onClick={() => {
                setProductToEdit(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0D9488] text-white text-xs sm:text-sm font-semibold shadow hover:bg-[#0F766E] transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-[#7A7065] hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Banner with controls & stats */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#F4EFE6] p-4 sm:p-5 rounded-2xl border border-[#E4D9C9]">
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#7A7065]">
            <div>
              Total: <strong className="text-[#2D2723]">{products.length}</strong> velas
            </div>
            <div>•</div>
            <div>
              En Stock: <strong className="text-[#0D9488]">{products.filter((p) => p.inStock).length}</strong>
            </div>
            <div>•</div>
            <div>
              Agotadas: <strong className="text-amber-800">{products.filter((p) => !p.inStock).length}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCatalog}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#7A7065] hover:text-[#2D2723] hover:bg-[#EAE2D5] transition-colors"
              title="Restablecer al catálogo original del PDF"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar a iniciales</span>
            </button>
          </div>

        </div>

        {/* Search & Categories Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A7065] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre o medida..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#2D2723] text-white border-[#2D2723]'
                    : 'bg-white text-[#2D2723] border-[#E4D9C9] hover:bg-[#F4EFE6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="text-center py-12 text-[#7A7065] text-sm">
            Cargando catálogo...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-[#F4EFE6] rounded-2xl border border-[#E4D9C9] p-8">
            <p className="text-sm text-[#7A7065]">No hay productos que coincidan con la búsqueda.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E4D9C9] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F4EFE6] border-b border-[#E4D9C9] text-[11px] font-bold uppercase tracking-wider text-[#7A7065]">
                  <tr>
                    <th className="py-3.5 px-4">Producto</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Medida</th>
                    <th className="py-3.5 px-4">Precio</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Categoría</th>
                    <th className="py-3.5 px-4">Estado</th>
                    <th className="py-3.5 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4D9C9]/60">
                  {filtered.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAF7F2] transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-[#E8DEC8] flex-shrink-0"
                          />
                          <div>
                            <div className="font-bold text-[#2D2723]">{product.name}</div>
                            {product.badge && (
                              <span className="inline-block text-[9px] uppercase font-bold text-[#0D9488] bg-[#0D9488]/10 px-1.5 py-0.5 rounded">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Size */}
                      <td className="py-3 px-4 hidden sm:table-cell text-[#7A7065]">
                        {product.size || '—'}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-serif font-bold text-[#2D2723]">
                        {formatCOP(product.price)}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 hidden md:table-cell text-[#7A7065]">
                        <span className="capitalize">{product.category}</span>
                      </td>

                      {/* Stock Switch */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStock(product)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                            product.inStock
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-stone-200 text-stone-700 border border-stone-300'
                          }`}
                        >
                          {product.inStock ? 'En Stock' : 'Agotado'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setProductToEdit(product);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-[#7A7065] hover:text-[#0D9488] hover:bg-[#0D9488]/10 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(product.id)}
                            className="p-1.5 rounded-lg text-[#7A7065] hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Modal for create / edit */}
      <ProductFormModal
        isOpen={isModalOpen}
        productToEdit={productToEdit}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Alert */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] rounded-2xl max-w-sm w-full p-6 border border-[#E4D9C9] shadow-2xl text-center space-y-4">
            <span className="w-12 h-12 rounded-full bg-red-100 text-red-600 inline-flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </span>
            <h4 className="font-serif text-lg font-bold text-[#2D2723]">
              ¿Eliminar esta vela?
            </h4>
            <p className="text-xs text-[#7A7065]">
              Esta acción no se puede deshacer. La vela desaparecerá del catálogo de la tienda.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#7A7065] hover:text-[#2D2723]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
