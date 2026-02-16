/**
 * @file seoUtils.ts
 * @description Utility functions for SEO management and metadata generation
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

import { logger } from '../logger';
import {
  DEFAULT_SEO,
  NATHAN_ORME_INFO,
  PAGE_SEO_CONFIG,
  type SEOConfig,
  generatePersonStructuredData,
  generateSoftwareApplicationStructuredData,
  generateWebsiteStructuredData,
} from './seoConfig';

/**
 * Get SEO configuration for a specific page
 */
export const getPageSEO = (pageKey: string): SEOConfig => {
  const config = PAGE_SEO_CONFIG[pageKey];
  if (!config) {
    logger.warn(
      `SEO config not found for page: ${pageKey}. Using default config.`,
    );
    return DEFAULT_SEO;
  }

  return {
    ...DEFAULT_SEO,
    ...config,
    keywords: [
      ...(DEFAULT_SEO.keywords || []),
      ...(config.keywords || []),
    ],
  };
};

/**
 * Generate canonical URL for a page
 */
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = NATHAN_ORME_INFO.website.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Generate Open Graph image URL
 */
export const generateOGImageUrl = (pageKey?: string): string => {
  const base = `${NATHAN_ORME_INFO.website}/images/og`;
  return pageKey ? `${base}/${pageKey}.jpg` : `${base}/default.jpg`;
};

/**
 * Create comprehensive metadata object for Helmet
 */
export interface HelmetMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData?: Record<string, any>[];
}

/**
 * Generate complete metadata for a page
 */
export const generatePageMetadata = (
  pageKey: string,
  path: string,
  customConfig?: Partial<SEOConfig>,
): HelmetMetadata => {
  const seoConfig = getPageSEO(pageKey);
  const finalConfig = { ...seoConfig, ...customConfig };

  const canonicalUrl = generateCanonicalUrl(path);
  const ogImage = finalConfig.ogImage || generateOGImageUrl(pageKey);

  let normalizedStructuredData: Record<string, any>[];
  if (Array.isArray(finalConfig.structuredData)) {
    normalizedStructuredData = finalConfig.structuredData;
  } else if (finalConfig.structuredData) {
    normalizedStructuredData = [finalConfig.structuredData];
  } else {
    normalizedStructuredData = [];
  }

  return {
    title: finalConfig.title,
    description: finalConfig.description,
    keywords: (finalConfig.keywords || []).join(', '),
    canonicalUrl,
    ogTitle: finalConfig.title,
    ogDescription: finalConfig.description,
    ogImage,
    ogUrl: canonicalUrl,
    ogType: finalConfig.ogType || 'website',
    twitterCard: finalConfig.twitterCard || 'summary_large_image',
    twitterTitle: finalConfig.title,
    twitterDescription: finalConfig.description,
    twitterImage: ogImage,
    structuredData: normalizedStructuredData,
  };
};

/**
 * React component for comprehensive SEO metadata
 */
export interface SEOHelmetProps {
  pageKey: string;
  path: string;
  customConfig?: Partial<SEOConfig>;
  includePersonData?: boolean;
  includeWebsiteData?: boolean;
  appName?: string;
  appDescription?: string;
  appCategory?: string;
  hrefLang?: string;
}

/**
 * Comprehensive SEO Helmet component
 */
export const SEOHelmet: React.FC<SEOHelmetProps> = ({
  pageKey,
  path,
  customConfig,
  includePersonData = false,
  includeWebsiteData = false,
  appName,
  appDescription,
  appCategory,
  hrefLang = 'en-gb',
}) => {
  const metadata = generatePageMetadata(pageKey, path, customConfig);

  // Generate structured data
  const structuredData: Record<string, any>[] = [];

  if (includePersonData) {
    structuredData.push(generatePersonStructuredData());
  }

  if (includeWebsiteData) {
    structuredData.push(generateWebsiteStructuredData());
  }

  if (appName && appDescription && appCategory) {
    structuredData.push(
      generateSoftwareApplicationStructuredData(
        appName,
        appDescription,
        appCategory,
        metadata.canonicalUrl,
      ),
    );
  }

  // Add any custom structured data
  if (metadata.structuredData) {
    structuredData.push(...metadata.structuredData);
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {/* We keep keywords internally for your own use, but do not render the deprecated tag */}

      <meta name="author" content={NATHAN_ORME_INFO.name} />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={metadata.canonicalUrl} />
      <link
        rel="alternate"
        hrefLang={hrefLang}
        href={metadata.canonicalUrl}
      />

      {/* Robots: modern, generous previews */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metadata.ogTitle} />
      <meta
        property="og:description"
        content={metadata.ogDescription}
      />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:url" content={metadata.ogUrl} />
      <meta property="og:type" content={metadata.ogType} />
      <meta
        property="og:site_name"
        content={`${NATHAN_ORME_INFO.name} - Portfolio`}
      />
      {/* Optional: provide alt text if you have a descriptive string */}
      {/* <meta property="og:image:alt" content={`${metadata.ogTitle} – preview`} /> */}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={metadata.twitterCard} />
      <meta name="twitter:title" content={metadata.twitterTitle} />
      <meta
        name="twitter:description"
        content={metadata.twitterDescription}
      />
      <meta name="twitter:image" content={metadata.twitterImage} />
      <meta name="twitter:creator" content="@nathanorme" />
      {/* <meta name="twitter:image:alt" content={`${metadata.twitterTitle} – preview`} /> */}

      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </Helmet>
  );
};

/**
 * Hook for getting page metadata (useful for dynamic titles, etc.)
 */
export const usePageSEO = (
  pageKey: string,
  path: string,
  customConfig?: Partial<SEOConfig>,
) => {
  return generatePageMetadata(pageKey, path, customConfig);
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>,
): Record<string, any> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

/**
 * Quick SEO helper for simple pages
 */
export const createSimpleSEO = (
  title: string,
  description: string,
  path: string,
  keywords?: string[],
): HelmetMetadata => {
  const enhancedTitle = title.includes(NATHAN_ORME_INFO.name)
    ? title
    : `${title} - ${NATHAN_ORME_INFO.name}`;

  const config: SEOConfig = {
    title: enhancedTitle,
    description,
    keywords: [...(DEFAULT_SEO.keywords || []), ...(keywords || [])],
  };

  return generatePageMetadata('custom', path, config);
};

export default SEOHelmet;
