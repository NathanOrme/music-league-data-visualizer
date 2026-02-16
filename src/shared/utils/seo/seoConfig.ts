/**
 * @file seoConfig.ts
 * @description Centralized SEO configuration and metadata for Nathan Orme's portfolio
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
  ogImageAlt?: string;
}

export interface PersonInfo {
  name: string;
  jobTitle: string;
  email: string;
  location: string;
  website: string;
  github: string;
  linkedin?: string;
  skills: string[];
  bio: string;
}

/**
 * Nathan Orme's personal and professional information
 */
export const NATHAN_ORME_INFO: PersonInfo = {
  name: 'Nathan Orme',
  jobTitle: 'Full-Stack Developer & Software Engineer',
  email: 'nathan@rgbnathan.co.uk',
  location: 'United Kingdom',
  website: 'https://www.rgbnathan.co.uk',
  github: 'https://github.com/rgbnathan',
  linkedin: 'https://linkedin.com/in/nathanorme',
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Java',
    'Spring Boot',
    'REST APIs',
    'Microservices',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'Git',
    'Agile Development',
  ],
  bio: 'Full-stack developer and software engineer specializing in modern web applications, microservices architecture, and user-centered design. Passionate about creating efficient, scalable solutions that deliver real business value.',
};

/**
 * Default SEO values used across the portfolio
 */
export const DEFAULT_SEO: SEOConfig = {
  title: `${NATHAN_ORME_INFO.name} - ${NATHAN_ORME_INFO.jobTitle}`,
  description: NATHAN_ORME_INFO.bio,
  keywords: [
    'Nathan Orme',
    'RGBNathan',
    'rgbnathan',
    'nathan orme developer',
    'nathan orme portfolio',
    'nathan orme uk',
    'rgbnathan developer',
    'rgbnathan portfolio',
    'rgbnathan github',
    'Full Stack Developer',
    'Software Engineer',
    'JavaScript Developer',
    'React Developer',
    'TypeScript Developer',
    'Java Developer',
    'Web Development',
    'Portfolio',
    'UK Developer',
    'Frontend Developer',
    'Backend Developer',
    'Microservices',
    'REST API',
    'Spring Boot',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'Music Applications',
    'Web Applications',
    'software engineer uk',
    'full stack developer uk',
    'react developer uk',
    'typescript developer uk',
  ],
  ogType: 'website',
  twitterCard: 'summary_large_image',
  canonicalUrl: NATHAN_ORME_INFO.website,
  ogImage: `${NATHAN_ORME_INFO.website}/images/og/default.jpg`,
  ogImageAlt: `${NATHAN_ORME_INFO.name} - Full-Stack Developer Portfolio`,
};

/**
 * Page-specific SEO configurations
 * Each page emphasizes Nathan Orme's name and clearly describes functionality
 */
export const PAGE_SEO_CONFIG: Record<string, SEOConfig> = {
  root: {
    title: `${NATHAN_ORME_INFO.name} - Domain Chooser | Portfolio Hub`,
    description: `Choose a domain to explore ${NATHAN_ORME_INFO.name}'s (RGBNathan) work across the portfolio, including web applications, music platforms, and developer tools.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'domain chooser',
      'portfolio hub',
      'project navigation',
      'developer portfolio',
    ],
    ogType: 'website',
    ogImage: `${NATHAN_ORME_INFO.website}/images/og/portfolio.jpg`,
    ogImageAlt: `${NATHAN_ORME_INFO.name} - Portfolio Domains`,
  },

  portfolio: {
    title: `${NATHAN_ORME_INFO.name} - Portfolio | Full-Stack Developer & Software Engineer`,
    description: `Explore ${NATHAN_ORME_INFO.name}'s (RGBNathan) portfolio showcasing innovative web applications, including the 1001 Albums Community platform, Discogs API integration, and Music League analytics. Discover projects built with React, TypeScript, Java, and modern web technologies by Nathan Orme.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'portfolio',
      'web applications',
      'project showcase',
      'developer portfolio',
      'nathan orme projects',
      'rgbnathan projects',
      'software portfolio',
      'developer showcase',
    ],
    ogType: 'profile',
    ogImage: `${NATHAN_ORME_INFO.website}/images/og/portfolio.jpg`,
    ogImageAlt: `${NATHAN_ORME_INFO.name} - Full-Stack Developer Portfolio`,
  },

  // 1001 Albums Project Pages
  '1001albums-home': {
    title: `1001 Albums Community - ${NATHAN_ORME_INFO.name}'s Music Discovery Platform`,
    description: `Discover essential albums with ${NATHAN_ORME_INFO.name} (RGBNathan)'s 1001 Albums Community platform. Submit recommendations, explore curated collections, and join the journey through music history. Built with React, TypeScript, and modern web technologies by Nathan Orme.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      '1001 albums',
      '1001 albums community',
      'music discovery',
      'album recommendations',
      'community platform',
      'music database',
      'album collection',
      'music history',
      'curated music',
      'nathan orme 1001 albums',
      'rgbnathan 1001 albums',
      'album discovery app',
      'music community app',
    ],
    ogImage: `${NATHAN_ORME_INFO.website}/images/og/1001albums.jpg`,
    ogImageAlt: '1001 Albums Community - Discover Essential Music',
    ogType: 'website',
  },

  '1001albums-submit': {
    title: `Submit Albums - 1001 Albums Community by ${NATHAN_ORME_INFO.name}`,
    description: `Submit your album recommendations to ${NATHAN_ORME_INFO.name}'s 1001 Albums Community. Easy-to-use form interface for contributing to our collaborative music discovery platform.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'submit albums',
      'music submission',
      'album recommendations',
      'community contributions',
    ],
  },

  '1001albums-browse': {
    title: `Browse Albums - 1001 Albums Community by ${NATHAN_ORME_INFO.name}`,
    description: `Browse and explore the complete collection of albums in ${NATHAN_ORME_INFO.name}'s 1001 Albums Community. Filter by genre, year, rating, and more to discover your next favorite album.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'browse albums',
      'music library',
      'album search',
      'music filtering',
    ],
  },

  '1001albums-unified': {
    title: `Browse & Manage Albums - 1001 Albums Community by ${NATHAN_ORME_INFO.name}`,
    description: `Browse albums, filter, and submit or manage your collection in one unified view. Built by ${NATHAN_ORME_INFO.name} (RGBNathan) for the 1001 Albums Community.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'album submission',
      'collection management',
      'unified albums',
      'music community',
      'album filters',
    ],
    ogImage: `${NATHAN_ORME_INFO.website}/images/og/1001albums.jpg`,
    ogImageAlt: '1001 Albums Community - Unified album browser',
    ogType: 'website',
  },

  '1001albums-admin': {
    title: `Admin Dashboard - 1001 Albums Community by ${NATHAN_ORME_INFO.name}`,
    description: `Administrative interface for ${NATHAN_ORME_INFO.name}'s 1001 Albums Community platform. Manage albums, users, events, and community data with comprehensive admin tools.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'admin dashboard',
      'content management',
      'platform administration',
    ],
  },

  '1001albums-playlists': {
    title: `Random Playlists - 1001 Albums Community by ${NATHAN_ORME_INFO.name}`,
    description: `Generate time-based random playlists (week, month, year) from the 1001 Albums library. Export playlists as TXT, CSV, or print-friendly for sharing and offline listening.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'random playlist',
      'weekly playlist',
      'monthly playlist',
      'year playlist',
      'playlist generator',
      'music discovery',
      'album playlists',
    ],
    ogImage: `${NATHAN_ORME_INFO.website}/images/og/1001albums.jpg`,
    ogImageAlt:
      'Generate random playlists from the 1001 Albums collection',
  },

  '1001albums-about': {
    title: `About - 1001 Albums Community by ${NATHAN_ORME_INFO.name}`,
    description:
      'Learn about the 1001 Albums Community: mission, data handling, and how to participate.',
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'about',
      '1001 albums community info',
      'music community',
    ],
  },

  // Discogs Integration
  'discogs-api': {
    title: `Discogs API Integration - ${NATHAN_ORME_INFO.name}'s Vinyl Record Search Tool`,
    description: `Search and explore vinyl records with ${NATHAN_ORME_INFO.name} (RGBNathan)'s Discogs API integration. Advanced search functionality, real-time data, and detailed record information for collectors and music enthusiasts. Built by Nathan Orme.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'Discogs API',
      'Discogs integration',
      'vinyl records',
      'music search',
      'record collection',
      'API integration',
      'vinyl search',
      'record database',
      'music collector',
      'nathan orme discogs',
      'rgbnathan discogs',
      'vinyl search app',
      'discogs search tool',
    ],
    ogImage: `${NATHAN_ORME_INFO.website}/images/og/discogs.jpg`,
    ogImageAlt: 'Discogs API Integration - Vinyl Record Search',
    ogType: 'website',
  },

  // Music League Analytics
  'music-league': {
    title: `Music League Analytics - ${NATHAN_ORME_INFO.name}'s Community Music Platform`,
    description: `Analyze and explore music league data with ${NATHAN_ORME_INFO.name} (RGBNathan)'s Music League Community platform. Interactive analytics, league management, and music discovery tools for competitive music enthusiasts. Built by Nathan Orme.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'Music League',
      'Music League Analytics',
      'music analytics',
      'community platform',
      'music competition',
      'data visualization',
      'music league data',
      'league statistics',
      'nathan orme music league',
      'rgbnathan music league',
      'music analytics app',
      'music league platform',
    ],
    ogImage: `${NATHAN_ORME_INFO.website}/images/og/music-league.jpg`,
    ogImageAlt: 'Music League Analytics - Community Music Platform',
    ogType: 'website',
  },

  'music-league-explore': {
    title: `Explore Data - Music League Analytics by ${NATHAN_ORME_INFO.name}`,
    description: `Deep dive into music league statistics and trends with ${NATHAN_ORME_INFO.name}'s advanced analytics tools. Explore player performance, song popularity, and league insights.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'music data',
      'analytics dashboard',
      'music statistics',
      'data exploration',
    ],
  },

  // Developer Tools
  'qr-generator': {
    title: `QR Code Generator - ${NATHAN_ORME_INFO.name}'s Developer Tool`,
    description: `Generate custom QR codes with ${NATHAN_ORME_INFO.name}'s advanced QR code generator. Support for URLs, text, WiFi, contact cards, and more with customizable styling options.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'QR code generator',
      'developer tools',
      'QR codes',
      'code generation',
    ],
  },

  'apps-tools': {
    title: `Apps & Tools Hub - ${NATHAN_ORME_INFO.name}'s Utility Suite`,
    description: `Choose between QR generation, Discogs exploration, and Music League utilities built by ${NATHAN_ORME_INFO.name} (RGBNathan).`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'apps hub',
      'developer tools',
      'music league analytics',
      'discogs search',
      'qr code generator',
      'portfolio utilities',
    ],
  },

  // Productivity Tools
  'habit-tracker': {
    title: `Habit Tracker - ${NATHAN_ORME_INFO.name}'s Productivity Tool`,
    description: `Build better habits with ${NATHAN_ORME_INFO.name}'s comprehensive habit tracking application. Track progress, set goals, and visualize your personal development journey.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'habit tracker',
      'productivity',
      'goal setting',
      'personal development',
    ],
  },

  'goal-tracker': {
    title: `Goal Progress Tracker - ${NATHAN_ORME_INFO.name}'s Achievement Tool`,
    description: `Track and achieve your goals with ${NATHAN_ORME_INFO.name}'s goal progress tracker. Set milestones, monitor progress, and celebrate achievements with detailed analytics.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'goal tracker',
      'progress tracking',
      'achievement',
      'milestone management',
    ],
  },

  'finance-tracker': {
    title: `Personal Finance Tracker - ${NATHAN_ORME_INFO.name}'s Financial Tool`,
    description: `Manage your finances with ${NATHAN_ORME_INFO.name}'s personal finance tracker. Budget planning, expense tracking, and financial insights to improve your financial health.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'finance tracker',
      'budget planning',
      'expense tracking',
      'financial management',
    ],
  },

  // Developer Zone
  'developer-zone': {
    title: `Developer Zone - ${NATHAN_ORME_INFO.name}'s Technical Documentation`,
    description: `Explore ${NATHAN_ORME_INFO.name}'s technical documentation, API references, and development resources. Learn about project architecture, component libraries, and development practices.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'developer documentation',
      'technical docs',
      'API documentation',
      'development resources',
    ],
  },

  'api-documentation': {
    title: `API Documentation - ${NATHAN_ORME_INFO.name}'s Developer Resources`,
    description: `Comprehensive API documentation for ${NATHAN_ORME_INFO.name}'s portfolio projects. Explore endpoints, authentication, rate limiting, and integration examples.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'API documentation',
      'REST API',
      'developer guide',
      'API reference',
    ],
  },

  'component-showcase': {
    title: `Component Showcase - ${NATHAN_ORME_INFO.name}'s UI Library`,
    description: `Explore ${NATHAN_ORME_INFO.name}'s custom component library built with React, TypeScript, and Tailwind CSS. Interactive examples and implementation guides for reusable UI components.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'component library',
      'UI components',
      'React components',
      'design system',
    ],
  },

  'project-architecture': {
    title: `Project Architecture - ${NATHAN_ORME_INFO.name}'s Technical Overview`,
    description: `Discover the technical architecture behind ${NATHAN_ORME_INFO.name}'s portfolio projects. Learn about design decisions, technology choices, and scalable development practices.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'project architecture',
      'technical design',
      'system architecture',
      'development practices',
    ],
  },

  // Oddball Records
  'oddball-records': {
    title: `Oddball Records - ${NATHAN_ORME_INFO.name}'s Music Community Platform`,
    description: `Discover unique music with ${NATHAN_ORME_INFO.name}'s Oddball Records platform. Community-driven music discovery, event management, and playlist curation for music enthusiasts.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'Oddball Records',
      'music community',
      'music discovery',
      'playlist curation',
    ],
  },

  'oddball-records-events': {
    title: `Oddball Records Events - ${NATHAN_ORME_INFO.name}`,
    description:
      'Browse upcoming and past Oddball Records events, discover featured albums, and join the community sessions.',
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'oddball events',
      'music events',
      'record events',
      'community gatherings',
    ],
  },

  'oddball-records-playlists': {
    title: `Oddball Records Playlists - ${NATHAN_ORME_INFO.name}`,
    description:
      'Listen to playlists curated from Oddball Records events with links to stream your favorites.',
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'oddball playlists',
      'event playlists',
      'music playlists',
      'community playlists',
    ],
  },

  'oddball-records-browser': {
    title: `Oddball Records - Community Records - ${NATHAN_ORME_INFO.name}`,
    description:
      'Browse the complete collection of vinyl records from Oddball Records events. Search and filter community-contributed albums.',
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'oddball records',
      'vinyl browser',
      'record collection',
      'vinyl community',
      'music discovery',
    ],
  },

  // Legal Pages
  'accessibility-statement': {
    title: `Accessibility Statement - ${NATHAN_ORME_INFO.name}'s Portfolio`,
    description: `${NATHAN_ORME_INFO.name}'s commitment to web accessibility. Learn about accessibility features, compliance standards, and how to request accommodations for this portfolio website.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'accessibility',
      'web accessibility',
      'WCAG compliance',
      'inclusive design',
    ],
  },

  'cookie-policy': {
    title: `Cookie Policy - ${NATHAN_ORME_INFO.name}'s Portfolio`,
    description: `Understanding cookie usage on ${NATHAN_ORME_INFO.name}'s portfolio website. Learn about cookie types, purposes, and how to manage your preferences.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'cookie policy',
      'privacy',
      'data protection',
      'GDPR compliance',
    ],
  },

  'terms-of-service': {
    title: `Terms of Service - ${NATHAN_ORME_INFO.name}'s Portfolio`,
    description: `Terms of service and usage guidelines for ${NATHAN_ORME_INFO.name}'s portfolio website and associated applications. User responsibilities and service limitations.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'terms of service',
      'usage terms',
      'legal terms',
      'service agreement',
    ],
  },

  'data-retention': {
    title: `Data Retention Policy - ${NATHAN_ORME_INFO.name}'s Portfolio`,
    description: `Data retention and management policies for ${NATHAN_ORME_INFO.name}'s portfolio applications. Learn how user data is stored, processed, and protected.`,
    keywords: [
      ...DEFAULT_SEO.keywords!,
      'data retention',
      'data policy',
      'privacy protection',
      'data management',
    ],
  },
};

/**
 * Generate structured data for Nathan Orme's portfolio
 */
export const generatePersonStructuredData = (): Record<
  string,
  any
> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: NATHAN_ORME_INFO.name,
  jobTitle: NATHAN_ORME_INFO.jobTitle,
  email: NATHAN_ORME_INFO.email,
  address: {
    '@type': 'Place',
    name: NATHAN_ORME_INFO.location,
  },
  url: NATHAN_ORME_INFO.website,
  sameAs: [
    NATHAN_ORME_INFO.github,
    ...(NATHAN_ORME_INFO.linkedin ? [NATHAN_ORME_INFO.linkedin] : []),
  ],
  knowsAbout: NATHAN_ORME_INFO.skills,
  description: NATHAN_ORME_INFO.bio,
  worksFor: {
    '@type': 'Organization',
    name: 'Independent Developer',
  },
});

/**
 * Generate structured data for portfolio website
 */
export const generateWebsiteStructuredData = (): Record<
  string,
  any
> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${NATHAN_ORME_INFO.name} - Portfolio`,
  description: `${NATHAN_ORME_INFO.name}'s professional portfolio showcasing full-stack development projects and technical expertise`,
  url: NATHAN_ORME_INFO.website,
  author: {
    '@type': 'Person',
    name: NATHAN_ORME_INFO.name,
    jobTitle: NATHAN_ORME_INFO.jobTitle,
  },
  publisher: {
    '@type': 'Person',
    name: NATHAN_ORME_INFO.name,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${NATHAN_ORME_INFO.website}/?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Generate structured data for software applications
 */
export const generateSoftwareApplicationStructuredData = (
  appName: string,
  description: string,
  applicationCategory: string,
  url: string,
): Record<string, any> => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: appName,
  description,
  applicationCategory,
  url,
  author: {
    '@type': 'Person',
    name: NATHAN_ORME_INFO.name,
    jobTitle: NATHAN_ORME_INFO.jobTitle,
  },
  creator: {
    '@type': 'Person',
    name: NATHAN_ORME_INFO.name,
  },
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
});

/**
 * Generate breadcrumb structured data for navigation
 */
export const generateBreadcrumbStructuredData = (
  breadcrumbs: Array<{ name: string; url: string }>,
): Record<string, any> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((breadcrumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: breadcrumb.name,
    item: breadcrumb.url,
  })),
});

/**
 * Get SEO configuration for a specific page
 * @param pageId - The page identifier (e.g., 'root', 'portfolio', '1001albums-home', 'discogs-api')
 * @returns SEO configuration for the page, or default config if not found
 */
export const getSEOConfigForPage = (pageId: string): SEOConfig => {
  return PAGE_SEO_CONFIG[pageId] || DEFAULT_SEO;
};

/**
 * Map route paths to page IDs for SEO configuration lookup
 */
export const ROUTE_TO_PAGE_ID_MAP: Record<string, string> = {
  '/': 'root',
  '/portfolio': 'portfolio',
  '/1001albums': '1001albums-home',
  '/1001albums/submit': '1001albums-submit',
  '/1001albums/browse': '1001albums-browse',
  '/1001albums/albums': '1001albums-unified',
  '/1001albums/admin': '1001albums-admin',
  '/discogs-api': 'discogs-api',
  '/music-league': 'music-league',
  '/music-league/explore': 'music-league-explore',
  '/apps': 'apps-tools',
  '/qr-generator': 'qr-generator',
  '/habit-tracker': 'habit-tracker',
  '/goal-progress-tracker': 'goal-tracker',
  '/personal-finance-tracker': 'finance-tracker',
  '/developer': 'developer-zone',
  '/developer/api': 'api-documentation',
  '/developer/components': 'component-showcase',
  '/developer/architecture': 'project-architecture',
  '/oddball-records': 'oddball-records',
  '/accessibility': 'accessibility-statement',
  '/cookie-policy': 'cookie-policy',
  '/terms-of-service': 'terms-of-service',
  '/data-retention': 'data-retention',
};
