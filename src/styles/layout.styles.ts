/**
 * @file layout.ts
 * @description Layout and container styles
 */

export const layoutStyles = {
  // Container styles
  container: {
    full: 'container mx-auto px-4 sm:px-6 lg:px-8',
    centered: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
    narrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl',
  },

  // Grid layouts
  grid: {
    responsive:
      'grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
    album:
      'grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
    cards: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3',
    form: 'grid gap-4 sm:grid-cols-2',
  },

  // Flex layouts
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    column: 'flex flex-col',
    columnCenter: 'flex flex-col items-center justify-center',
    wrap: 'flex flex-wrap gap-2',
  },

  // Section styles
  section: {
    base: 'py-8 md:py-12',
    hero: 'py-12 md:py-20 px-4',
    content: 'space-y-6',
  },

  // Navigation styles - consolidated from all navigation components
  nav: {
    // Base navigation (from shared/layout.ts)
    container:
      'fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10',
    inner: 'container mx-auto px-4 sm:px-6 lg:px-8',
    content: 'flex items-center justify-between h-16',
    mobile: 'lg:hidden',
    desktop: 'hidden lg:flex lg:items-center lg:space-x-8',

    // Navbar styles (from NavbarShadcn.styles.ts)
    navbar: {
      container:
        'sticky top-0 z-50 w-full bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-lg border-b border-white/10 shadow-2xl shadow-black/50',
      inner: 'container mx-auto px-4 sm:px-6 lg:px-8',
      content: 'flex items-center justify-between h-16 sm:h-18',
      logo: {
        container: 'flex items-center space-x-2',
        text: 'text-lg sm:text-xl font-bold text-white hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent tracking-wide',
      },
      desktop: {
        nav: 'hidden md:flex items-center space-x-1',
        menu: 'flex items-center space-x-6',
        link: 'text-gray-300 hover:text-white transition-colors duration-200 font-medium',
        activeLink: 'text-white border-b-2 border-purple-500',
      },
      mobile: {
        trigger: 'md:hidden',
        button:
          'text-white hover:bg-white/10 transition-all duration-200 hover:rotate-90',
        sheet:
          'w-80 bg-gradient-to-b from-gray-900/98 via-black/98 to-gray-900/98 backdrop-blur-2xl border-r border-white/10',
        content: 'w-[300px] p-6',
        nav: 'flex flex-col space-y-4 mt-6',
        link: 'text-gray-300 hover:text-white transition-colors duration-200 font-medium text-lg',
        activeLink: 'text-white bg-white/10 px-3 py-2 rounded-md',
      },
      dropdown: {
        trigger:
          'flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 font-medium',
        content:
          'backdrop-blur-xl bg-black/90 border border-white/10 shadow-xl',
        item: 'text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200',
        separator: 'bg-white/10',
      },
    },

    // Navigation tabs styles (from NavigationTabs.styles.ts & UnifiedAlbumsPage.styles.ts)
    tabs: {
      container:
        'sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-white/10 shadow-2xl shadow-black/50',
      wrapper: 'max-w-6xl mx-auto px-4 py-4',
      list: 'grid w-full grid-cols-2 md:grid-cols-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-1',
      button:
        'flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-300 text-white/70 hover:text-white hover:bg-white/10 data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-teal-500/30 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/20',
      sections: {
        all: {
          active: 'bg-gradient-to-r from-purple-600 to-teal-500',
          inactive: 'hover:bg-purple-500/20',
        },
        owned: {
          active: 'bg-gradient-to-r from-green-600 to-teal-500',
          inactive: 'hover:bg-green-500/20',
        },
        unplayed: {
          active: 'bg-gradient-to-r from-red-600 to-orange-500',
          inactive: 'hover:bg-red-500/20',
        },
        popular: {
          active: 'bg-gradient-to-r from-yellow-600 to-orange-500',
          inactive: 'hover:bg-yellow-500/20',
        },
        community: {
          active: 'bg-gradient-to-r from-blue-600 to-purple-500',
          inactive: 'hover:bg-blue-500/20',
        },
      },
    },

    // Music League breadcrumb navigation (from music-league/components/navigation.ts)
    breadcrumb: {
      container: 'sticky top-4 z-50 mb-6',
      wrapper:
        'bg-black/40 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10 shadow-2xl',
      content: 'flex items-center space-x-2 text-sm',
      item: 'text-gray-300 hover:text-white transition-colors duration-200',
      separator: 'text-gray-500',
      active: 'text-white font-medium',
    },

    // Music League navigation headers
    header: {
      container: 'flex items-center justify-between mb-4',
      controls: 'flex items-center space-x-2',
      button: 'text-white hover:bg-white/10 p-2',
      breadcrumb: 'text-gray-300 text-sm',
    },
  },
} as const;

export const spacing = {
  // Padding variants
  padding: {
    xs: 'p-2',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-12',
  },

  // Margin variants
  margin: {
    xs: 'm-2',
    sm: 'm-3 sm:m-4',
    md: 'm-4 sm:m-6',
    lg: 'm-6 sm:m-8',
    xl: 'm-8 sm:m-12',
  },

  // Gap variants
  gap: {
    xs: 'gap-2',
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  },
} as const;

export type ContainerVariant = keyof typeof layoutStyles.container;
export type GridVariant = keyof typeof layoutStyles.grid;
export type FlexVariant = keyof typeof layoutStyles.flex;
