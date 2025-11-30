/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Opinion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Opinion` table without a default value. This is not possible if the table is not empty.

*/

-- Primero agregamos la columna slug con un valor temporal
ALTER TABLE "public"."Opinion" ADD COLUMN "slug" TEXT;

-- Actualizar todas las opiniones existentes con slugs únicos
DO $$
DECLARE
    r RECORD;
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER;
BEGIN
    FOR r IN SELECT id, titulo FROM "public"."Opinion" ORDER BY id LOOP
        -- Generar slug base
        base_slug := lower(unaccent(r.titulo));
        base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
        base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
        base_slug := regexp_replace(base_slug, '-+', '-', 'g');
        base_slug := trim(both '-' from base_slug);
        base_slug := substring(base_slug from 1 for 100);
        
        final_slug := base_slug;
        counter := 2;
        
        -- Hacer el slug único si ya existe
        WHILE EXISTS (SELECT 1 FROM "public"."Opinion" WHERE slug = final_slug AND id < r.id) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
        
        UPDATE "public"."Opinion" SET slug = final_slug WHERE id = r.id;
    END LOOP;
END $$;

-- Ahora hacemos la columna NOT NULL
ALTER TABLE "public"."Opinion" ALTER COLUMN "slug" SET NOT NULL;

-- Crear índice único
CREATE UNIQUE INDEX "Opinion_slug_key" ON "public"."Opinion"("slug");
