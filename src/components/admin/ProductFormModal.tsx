import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles, AlertCircle } from 'lucide-react';
import type { Product, CategoryId } from '../../types/product';
import { CATEGORIES } from '../../data/products';

interface ProductFormModalProps {
  isOpen: boolean;
  productToEdit: Product | null;
  onClose: () => void;
  onSave: (data: Omit<Product, 'id'>, imageFile?: File) => Promise<void>;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  productToEdit,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState<number>(10000);
  const [category, setCategory] = useState<CategoryId>('flores');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Available categories (excluding 'todos')
  const availableCategories = CATEGORIES.filter((c) => c.id !== 'todos');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setSize(productToEdit.size || '');
      setPrice(productToEdit.price);
      setCategory(productToEdit.category);
      setBadge(productToEdit.badge || '');
      setDescription(productToEdit.description || '');
      setInStock(productToEdit.inStock ?? true);
      setImagePreview(productToEdit.image);
      setImageFile(null);
    } else {
      setName('');
      setSize('');
      setPrice(10000);
      setCategory('flores');
      setBadge('');
      setDescription('');
      setInStock(true);
      setImagePreview('');
      setImageFile(null);
    }
    setErrorMsg('');
  }, [productToEdit, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('El nombre de la vela es obligatorio.');
      return;
    }

    if (!imagePreview && !imageFile) {
      setErrorMsg('Debes subir una fotografía para la vela.');
      return;
    }

    if (price <= 0) {
      setErrorMsg('El precio debe ser mayor a 0 COP.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(
        {
          name: name.trim(),
          size: size.trim() || undefined,
          price: Number(price),
          category,
          image: imagePreview,
          badge: badge.trim() || undefined,
          description: description.trim() || undefined,
          inStock,
        },
        imageFile || undefined
      );
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al guardar el producto.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-2xl sm:rounded-3xl max-w-xl w-full border border-[#E4D9C9] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E4D9C9] bg-[#F4EFE6] flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2723]">
              {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7A7065] hover:text-[#2D2723] hover:bg-[#EAE2D5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
                Nombre de la Vela *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Rosa Esculpida"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
                Medidas / Tamaño
              </label>
              <input
                type="text"
                placeholder="Ej. 10 cm, 5cm x 5cm"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              />
            </div>
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
                Precio en COP ($) *
              </label>
              <input
                type="number"
                required
                min={500}
                step={500}
                placeholder="Ej. 15000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
                Categoría *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              >
                {availableCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Badge & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
                Etiqueta / Badge (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. Popular, Nuevo, Edición Limitada"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              />
            </div>

            <div className="pt-4 sm:pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-[#0D9488] rounded border-[#E4D9C9] focus:ring-[#0D9488]"
                />
                <span className="text-xs font-semibold text-[#2D2723]">
                  Disponible / En Stock
                </span>
              </label>
            </div>
          </div>

          {/* Image Uploader */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
              Fotografía de la Vela *
            </label>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-2xl border border-dashed border-[#D8CEBE]">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="w-20 h-20 rounded-xl object-cover bg-[#E8DEC8] flex-shrink-0 border border-[#E4D9C9]"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-[#F4EFE6] border border-[#E4D9C9] flex items-center justify-center text-[#7A7065] flex-shrink-0">
                  <Upload className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 w-full text-center sm:text-left">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#2D2723] text-xs font-semibold cursor-pointer transition-colors border border-[#E4D9C9]">
                  <Upload className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>{imagePreview ? 'Cambiar Imagen' : 'Subir Fotografía'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-[#7A7065] mt-1.5">
                  Formatos recomendados: JPG, PNG o WebP.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5">
              Descripción Completa
            </label>
            <textarea
              rows={3}
              placeholder="Describe los detalles, estética o uso de la vela..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E4D9C9] text-xs sm:text-sm text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-[#E4D9C9] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#7A7065] hover:text-[#2D2723] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-semibold shadow transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Guardando...</span>
              ) : (
                <span>{productToEdit ? 'Actualizar Producto' : 'Crear Producto'}</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
