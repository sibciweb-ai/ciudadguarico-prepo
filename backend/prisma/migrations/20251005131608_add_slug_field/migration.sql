/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Noticia` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Noticia` table without a default value. This is not possible if the table is not empty.

*/

-- Habilitar extensión unaccent si no existe
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Primero agregamos la columna slug con un valor temporal
ALTER TABLE "public"."Noticia" ADD COLUMN "slug" TEXT;

-- Función para generar slug desde SQL
CREATE OR REPLACE FUNCTION generate_slug(text_input TEXT) RETURNS TEXT AS $$
DECLARE
    slug_output TEXT;
BEGIN
    -- Convertir a minúsculas y remover acentos
    slug_output := lower(unaccent(text_input));
    
    -- Reemplazar caracteres especiales y espacios por guiones
    slug_output := regexp_replace(slug_output, '[^a-z0-9\s-]', '', 'g');
    slug_output := regexp_replace(slug_output, '\s+', '-', 'g');
    slug_output := regexp_replace(slug_output, '-+', '-', 'g');
    slug_output := trim(both '-' from slug_output);
    
    -- Truncar a 100 caracteres
    slug_output := substring(slug_output from 1 for 100);
    
    RETURN slug_output;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Actualizar todas las noticias existentes con slugs únicos
DO $$
DECLARE
    r RECORD;
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER;
BEGIN
    FOR r IN SELECT id, titulo FROM "public"."Noticia" ORDER BY id LOOP
        base_slug := generate_slug(r.titulo);
        final_slug := base_slug;
        counter := 2;
        
        -- Hacer el slug único si ya existe
        WHILE EXISTS (SELECT 1 FROM "public"."Noticia" WHERE slug = final_slug AND id < r.id) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
        
        UPDATE "public"."Noticia" SET slug = final_slug WHERE id = r.id;
    END LOOP;
END $$;

-- Ahora hacemos la columna NOT NULL
ALTER TABLE "public"."Noticia" ALTER COLUMN "slug" SET NOT NULL;

-- Crear índice único
CREATE UNIQUE INDEX "Noticia_slug_key" ON "public"."Noticia"("slug");

-- Limpiar la función temporal
DROP FUNCTION IF EXISTS generate_slug(TEXT);
