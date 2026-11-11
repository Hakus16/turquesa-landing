-- ========================================================
-- TURQUESA: CONFIGURACIÓN INICIAL DE BASE DE DATOS SUPABASE
-- ========================================================

-- 1. Crear tabla de productos
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  size TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  badge TEXT,
  in_stock BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Seguridad por Fila (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de acceso a la tabla products
DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
CREATE POLICY "Permitir lectura publica de productos" 
ON public.products FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Permitir insercion de productos" ON public.products;
CREATE POLICY "Permitir insercion de productos" 
ON public.products FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizacion de productos" ON public.products;
CREATE POLICY "Permitir actualizacion de productos" 
ON public.products FOR UPDATE 
USING (true);

DROP POLICY IF EXISTS "Permitir eliminacion de productos" ON public.products;
CREATE POLICY "Permitir eliminacion de productos" 
ON public.products FOR DELETE 
USING (true);

-- 4. Crear bucket de almacenamiento para fotos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de Storage para fotos
DROP POLICY IF EXISTS "Imagenes publicas para lectura" ON storage.objects;
CREATE POLICY "Imagenes publicas para lectura" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Permitir subida de imagenes" ON storage.objects;
CREATE POLICY "Permitir subida de imagenes" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Permitir actualizar imagenes" ON storage.objects;
CREATE POLICY "Permitir actualizar imagenes" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Permitir eliminar imagenes" ON storage.objects;
CREATE POLICY "Permitir eliminar imagenes" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'product-images');

-- 5. Cargar catálogo inicial de 12 productos
INSERT INTO public.products (id, name, size, price, category, image, description, badge, in_stock)
VALUES
  ('margaritas', 'Margaritas', 'Pequeñas', 3000, 'flores', '/images/margaritas.png', 'Velas individuales en forma de margarita con centro detallado. Ideales para recuerdos y detalles especiales.', 'Más accesible', true),
  ('nube', 'Nube Minimalista', '5 cm', 5000, 'geometricas', '/images/nube.png', 'Diseño suave y esponjoso en forma de nube. Un acento relajante y tierno para tu mesa de noche o escritorio.', NULL, true),
  ('mariposa', 'Mariposa Delicada', '5 cm', 7000, 'geometricas', '/images/mariposa.png', 'Silueta de mariposa con finas ranuras geométricas en sus alas. Disponible en tonos cálidos y pasteles.', 'Popular', true),
  ('rosa', 'Rosa Esculpida', 'Pequeña - 4 cm', 7000, 'flores', '/images/rosa.png', 'Floración tridimensional de pétalos superpuestos con texturas hiperrealistas. Elegancia atemporal.', NULL, true),
  ('mandarina-pequena', 'Mandarina Pequeña', '4 cm', 8000, 'frutales', '/images/mandarina-pequena.png', 'Vela artesanal con textura de cáscara de cítrico y hoja decorativa. Llena de frescura visual.', NULL, true),
  ('cruz', 'Cruz Escultural', '10 cm', 10000, 'geometricas', '/images/cruz.png', 'Diseño arquitectónico sagrado y solemne con acabado satinado. Perfecta para momentos de reflexión y serenidad.', NULL, true),
  ('copo-nieve', 'Copo de Nieve / Espiral', '6 cm', 12000, 'geometricas', '/images/copo-nieve.png', 'Escultura helicoidal con curvas dinámicas que generan sombras fascinantes al estar encendida.', NULL, true),
  ('cuadrado-corazones', 'Cuadrado de Corazones (Bubble)', '5 cm x 5 cm', 15000, 'geometricas', '/images/cuadrado-corazones.png', 'Cubocúbico compuesto por esferas de corazones entrelazadas. La pieza viral indispensable para estética aesthetic.', 'Tendencia', true),
  ('vasito', 'Vasito Personalizado', NULL, 15000, 'vasos', '/images/vasito.png', 'Vela vertida en vaso de vidrio reutilizable con color y esencia a elección. (Sujeto a disponibilidad).', 'Personalizable', true),
  ('mandarina-grande', 'Mandarina Grande', '8 cm', 17000, 'frutales', '/images/mandarina-grande.png', 'Tamaño generoso con textura botánica hiperrealista. Un punto focal alegre y vibrante en cualquier habitación.', NULL, true),
  ('postres', 'Postres Gourmet en Vaso', NULL, 20000, 'vasos', '/images/postres.png', 'Vaso relleno de cera con cera batida decorada con corazones y tabletas de chocolate artesanales. (Sujeto a disponibilidad).', 'Edición Gourmet', true),
  ('arcos-set', 'Arcos Escandinavos (Set x3)', '8 cm - 7 cm - 6 cm', 20000, 'sets', '/images/arcos.png', 'Trilogía de arcos acanalados en tres alturas armoniosas. Inspiración nórdica y moderna para repisas y mesas de centro.', 'Set Completo', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  size = EXCLUDED.size,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  image = EXCLUDED.image,
  description = EXCLUDED.description,
  badge = EXCLUDED.badge,
  in_stock = EXCLUDED.in_stock;
