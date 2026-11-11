import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types/product';

const LOCAL_STORAGE_KEY = 'turquesa_products_v1';

// Initialize local storage if not present
const getStoredLocalProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading from localStorage', e);
    return PRODUCTS;
  }
};

const saveLocalProducts = (products: Product[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
};

// Convert File to base64 for fallback local storage
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const productService = {
  // 1. Fetch all products
  async getAll(): Promise<Product[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase fetch error, fallback to local:', error.message);
          return getStoredLocalProducts();
        }

        if (data && data.length > 0) {
          // Map DB columns to Product type
          return data.map((item) => ({
            id: item.id,
            name: item.name,
            size: item.size?.trim() || undefined,
            price: Number(item.price),
            category: item.category,
            image: item.image,
            description: item.description?.trim() || undefined,
            badge: item.badge?.trim() || undefined,
            inStock: item.in_stock ?? true,
          }));
        }

        // If table is empty, return initial catalog
        return getStoredLocalProducts();
      } catch (err) {
        console.error('Unexpected error in Supabase fetch:', err);
        return getStoredLocalProducts();
      }
    }

    // Default to localStorage
    return getStoredLocalProducts();
  },

  // 2. Upload image (to Supabase Storage or base64 fallback)
  async uploadImage(file: File): Promise<string> {
    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) {
          console.warn('Supabase storage upload error, fallback to base64:', uploadError.message);
          return await fileToBase64(file);
        }

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        return data.publicUrl;
      } catch (e) {
        console.error('Error uploading to Supabase storage:', e);
        return await fileToBase64(file);
      }
    }

    return await fileToBase64(file);
  },

  // 3. Create product
  async create(newProduct: Omit<Product, 'id'>, imageFile?: File): Promise<Product> {
    let imageUrl = newProduct.image;

    if (imageFile) {
      imageUrl = await this.uploadImage(imageFile);
    }

    const generatedId = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const productToSave: Product = {
      ...newProduct,
      id: generatedId,
      image: imageUrl,
      name: newProduct.name.trim(),
      size: newProduct.size?.trim() || undefined,
      description: newProduct.description?.trim() || undefined,
      badge: newProduct.badge?.trim() || undefined,
      inStock: newProduct.inStock ?? true,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').insert([
          {
            id: productToSave.id,
            name: productToSave.name,
            size: productToSave.size || null,
            price: productToSave.price,
            category: productToSave.category,
            image: productToSave.image,
            description: productToSave.description || null,
            badge: productToSave.badge || null,
            in_stock: productToSave.inStock,
          },
        ]);

        if (error) {
          console.error('Supabase insert error, saving locally:', error.message);
        }
      } catch (e) {
        console.error('Error inserting to Supabase:', e);
      }
    }

    // Always update localStorage as well for instant responsiveness & cache
    const current = getStoredLocalProducts();
    const updated = [productToSave, ...current];
    saveLocalProducts(updated);

    return productToSave;
  },

  // 4. Update product
  async update(id: string, updates: Partial<Product>, imageFile?: File): Promise<Product> {
    let imageUrl = updates.image;

    if (imageFile) {
      imageUrl = await this.uploadImage(imageFile);
    }

    const finalUpdates: Partial<Product> = {
      ...updates,
      ...(imageUrl ? { image: imageUrl } : {}),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const dbUpdates: Record<string, unknown> = {};
        if (finalUpdates.name !== undefined) dbUpdates.name = finalUpdates.name.trim();
        if ('size' in finalUpdates) dbUpdates.size = finalUpdates.size?.trim() || null;
        if (finalUpdates.price !== undefined) dbUpdates.price = Number(finalUpdates.price);
        if (finalUpdates.category !== undefined) dbUpdates.category = finalUpdates.category;
        if (finalUpdates.image !== undefined) dbUpdates.image = finalUpdates.image;
        if ('description' in finalUpdates) dbUpdates.description = finalUpdates.description?.trim() || null;
        if ('badge' in finalUpdates) dbUpdates.badge = finalUpdates.badge?.trim() || null;
        if (finalUpdates.inStock !== undefined) dbUpdates.in_stock = finalUpdates.inStock;

        const { error } = await supabase
          .from('products')
          .update(dbUpdates)
          .eq('id', id);

        if (error) {
          console.error('Supabase update error:', error.message);
        }
      } catch (e) {
        console.error('Error updating in Supabase:', e);
      }
    }

    // Update local storage
    const current = getStoredLocalProducts();
    const updated = current.map((p) => {
      if (p.id !== id) return p;
      const merged: Product = { ...p, ...finalUpdates };
      if (!finalUpdates.badge?.trim()) {
        delete merged.badge;
      } else {
        merged.badge = finalUpdates.badge.trim();
      }
      if (!finalUpdates.size?.trim()) {
        delete merged.size;
      }
      if (!finalUpdates.description?.trim()) {
        delete merged.description;
      }
      return merged;
    });
    saveLocalProducts(updated);

    const found = updated.find((p) => p.id === id);
    if (!found) throw new Error('Product not found');
    return found;
  },

  // 5. Delete product
  async delete(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          console.error('Supabase delete error:', error.message);
        }
      } catch (e) {
        console.error('Error deleting from Supabase:', e);
      }
    }

    // Update local storage
    const current = getStoredLocalProducts();
    const updated = current.filter((p) => p.id !== id);
    saveLocalProducts(updated);
  },

  // 6. Reset to default catalog
  resetToDefaults(): Product[] {
    saveLocalProducts(PRODUCTS);
    return PRODUCTS;
  },
};
