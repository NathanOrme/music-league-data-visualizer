/**
 * @file ui.styles.ts
 * @description Styles for shadcn/ui components with glass-morphism
 */

export const uiStyles = {
  // Dialog components
  dialog: {
    overlay:
      'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  },

  // Progress components
  progress: {
    container:
      'relative h-4 w-full overflow-hidden rounded-full bg-white/10',
    bar: 'h-full w-full flex-1 bg-gradient-to-r from-purple-500 via-teal-500 to-red-500 transition-all duration-300 ease-in-out rounded-full shadow-lg shadow-purple-500/30',
  },

  // Table components with glass-morphism
  table: {
    container:
      'relative w-full overflow-x-auto rounded-lg backdrop-blur-sm bg-background/50 border border-border/50 shadow-lg',
    table:
      'w-full caption-bottom text-sm border-collapse bg-background/30 backdrop-blur-sm rounded-lg overflow-hidden',
    header:
      '[&_tr]:border-b [&_tr]:border-border/50 bg-background/20 backdrop-blur-sm',
    body: '[&_tr:last-child]:border-0 divide-y divide-border/30',
    footer:
      'bg-muted/30 border-t border-border/50 font-medium [&>tr]:last:border-b-0 backdrop-blur-sm',
    row: 'hover:bg-accent/30 data-[state=selected]:bg-accent/50 border-b border-border/30 transition-colors',
    head: 'text-foreground h-12 px-4 text-left align-middle font-semibold whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] bg-background/50 backdrop-blur-sm border-b border-border/50 group-hover:bg-accent/20 transition-colors',
    cell: 'p-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] border-b border-border/20 last:border-r-0 group-hover:bg-accent/10 transition-colors',
    caption:
      'text-muted-foreground/80 mt-4 text-sm px-4 py-2 bg-background/20 backdrop-blur-sm rounded-b-lg',
  },
} as const;
