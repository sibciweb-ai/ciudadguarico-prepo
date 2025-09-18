import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export default function SEOHead({
  title = "Ciudad Guárico",
  description = "Ciudad Guárico - Periódico digital líder de Venezuela. Noticias de Guárico, gobernación, municipios, deportes, cultura y política nacional.",
  keywords = "Ciudad Guárico, noticias Venezuela, Guárico, periódico digital, gobernación",
  image = "https://ciudadguarico.com/logo.png",
  url = "https://ciudadguarico.com",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: SEOHeadProps) {

  useEffect(() => {
    // Actualizar título
    document.title = title;

    // Actualizar meta description
    updateMetaTag('name', 'description', description);
    
    // Actualizar keywords
    const allKeywords = [keywords, ...tags].filter(Boolean).join(', ');
    updateMetaTag('name', 'keywords', allKeywords);

    // Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:type', type);

    // Twitter Cards
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);

    // Para artículos de noticias
    if (type === 'article') {
      updateMetaTag('property', 'article:publisher', 'SIBCI Guárico');
      if (author) updateMetaTag('property', 'article:author', author);
      if (section) updateMetaTag('property', 'article:section', section);
      if (publishedTime) updateMetaTag('property', 'article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('property', 'article:modified_time', modifiedTime);
      
      // Tags del artículo
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }

    // Canonical URL
    updateLinkTag('canonical', url);

    // JSON-LD para artículos
    if (type === 'article') {
      updateArticleSchema({
        title,
        description,
        image,
        url,
        publishedTime,
        modifiedTime,
        author,
        section
      });
    }

  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, author, section, tags]);

  return null;
}

// Función helper para actualizar meta tags
function updateMetaTag(attribute: string, value: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

// Función helper para actualizar link tags
function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

// Función para actualizar Schema.org de artículos
function updateArticleSchema({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
  section
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}) {
  // Remover schema anterior si existe
  const existingSchema = document.querySelector('script[data-schema="article"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630
    },
    "url": url,
    "datePublished": publishedTime || new Date().toISOString(),
    "dateModified": modifiedTime || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": author || "Ciudad Guárico"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ciudad Guárico",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ciudadguarico.com/logo.png",
        "width": 400,
        "height": 400
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": section || "Noticias",
    "inLanguage": "es-VE",
    "isAccessibleForFree": true,
    "genre": "news",
    "keywords": `noticias Venezuela, Guárico, ${section || 'actualidad'}`,
    "locationCreated": {
      "@type": "Place",
      "name": "Guárico, Venezuela"
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'article');
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}
