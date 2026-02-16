/**
 * @file Table.styles.ts
 * @description Styles for table components with glass-morphism design
 */

export const tableStyles = {
  // Table container
  container:
    'relative w-full overflow-x-auto rounded-lg backdrop-blur-sm bg-background/50 border border-border/50 shadow-lg',

  // Table wrapper
  wrapper: 'w-full overflow-auto',

  // Base table
  table: 'w-full caption-bottom text-sm',

  // Table header
  header: {
    container:
      'bg-background/30 backdrop-blur-sm border-b border-border/50',
    row: '[&_tr]:border-b',
  },

  // Table header cell
  headerCell:
    'h-12 px-4 text-left align-middle font-medium text-muted-foreground backdrop-blur-sm border-r border-border/30 last:border-r-0',

  // Table body
  body: {
    container: 'bg-background/20 backdrop-blur-sm',
    row: '[&>tr:last-child]:border-0',
  },

  // Table body cell
  bodyCell:
    'p-4 align-middle backdrop-blur-sm border-r border-border/20 last:border-r-0',

  // Table footer
  footer: {
    container:
      'bg-background/20 backdrop-blur-sm rounded-b-lg border-t border-border/50',
    row: 'border-b-0',
    cell: 'font-medium backdrop-blur-sm',
  },

  // Table caption
  caption: 'mt-4 text-sm text-muted-foreground backdrop-blur-sm',

  // Table variants
  variants: {
    default: '',
    striped: '[&>tbody>tr:nth-child(odd)]:bg-muted/50',
    bordered:
      'border-separate border-spacing-0 [&_td]:border [&_th]:border',
  },

  // Interactive states
  interactive: {
    row: 'hover:bg-muted/50 transition-colors cursor-pointer',
    cell: 'hover:bg-muted/30 transition-colors',
  },

  // Size variants
  sizes: {
    sm: '[&_th]:h-8 [&_th]:px-2 [&_td]:p-2 text-xs',
    md: '[&_th]:h-10 [&_th]:px-3 [&_td]:p-3 text-sm',
    lg: '[&_th]:h-12 [&_th]:px-4 [&_td]:p-4 text-base',
  },

  // Loading state
  loading: {
    overlay:
      'absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center rounded-lg',
    skeleton: 'animate-pulse bg-muted/50 rounded',
  },

  // Empty state
  empty: {
    container: 'text-center py-8',
    message: 'text-muted-foreground text-sm',
  },
} as const;
