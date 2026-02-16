/**
 * @file index.ts
 * @description Main export file for SEO utilities
 */

// Configuration exports
export {
  DEFAULT_SEO,
  NATHAN_ORME_INFO,
  PAGE_SEO_CONFIG,
  generatePersonStructuredData,
  generateSoftwareApplicationStructuredData,
  generateWebsiteStructuredData,
  type PersonInfo,
  type SEOConfig,
} from './seoConfig';

// Utility exports
export {
  SEOHelmet,
  createSimpleSEO,
  generateBreadcrumbStructuredData,
  generateCanonicalUrl,
  generateOGImageUrl,
  generatePageMetadata,
  getPageSEO,
  usePageSEO,
  type HelmetMetadata,
  type SEOHelmetProps,
} from './seoUtils';

// Default export
export { default } from './seoUtils';
