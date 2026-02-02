# AGENTS.md

Configuration and instructions for AI coding agents working on this project.

## Project Context

**Music League Data Visualizer** is a React 19 + TypeScript + Vite 7 application
that visualizes Music League data and Spotify playlists.

## Quick Reference

| Aspect | Details |
|--------|---------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| State | React Context API |
| Routing | React Router 7 |
| Testing | Vitest + React Testing Library |

## Agent Roles

### Component Agent

**Purpose**: Create and modify UI components

**Key locations**:
- UI components: `src/shared/components/ui/`
- Music League components: `src/music-league/components/`
- Design system: `src/music-league/styles/playful-design-system.ts`

**Guidelines**:
- Use `cn()` from `@/shared/lib/utils` for className merging
- Follow the playful design system (20px rounded corners, colorful shadows)
- Ensure 44px minimum touch targets for interactive elements
- Use Lucide React for icons
- Export new components from index files

### Data Processing Agent

**Purpose**: Handle data loading, parsing, and transformation

**Key locations**:
- Data processing: `src/shared/utils/dataProcessing.ts`
- League config: `src/config/leagues.config.ts`
- Data context: `src/music-league/contexts/LeagueDataContext.tsx`

**Guidelines**:
- ZIP files are processed client-side with JSZip
- CSV files parsed with PapaParse
- All data loading is async with timeout protection
- Use `Promise.allSettled` for graceful error handling

### Styling Agent

**Purpose**: Modify styles and design system

**Key locations**:
- Design system: `src/music-league/styles/playful-design-system.ts`
- Global CSS: `src/index.css`
- Tailwind config: `tailwind.config.js` (if exists)

**Color palette**:
```
Coral:     #FF6B6B (primary)
Sky Blue:  #4ECDC4 (secondary)
Sunshine:  #FFE66D (highlights)
Mint:      #95E1D3 (tertiary)
Dark BG:   #1a1a1a
Dark Card: #2a2a2a
```

### Testing Agent

**Purpose**: Write and maintain tests

**Key locations**:
- Test setup: `src/setupTests.ts`
- Test config: `vitest.config.ts`

**Guidelines**:
- Use Vitest for unit/integration tests
- Use React Testing Library for component tests
- Mock data processing for faster tests
- Test accessibility with jest-axe if available

## File Patterns

### Creating a new component

```typescript
// src/music-league/components/MyComponent.tsx
import { cn } from '@/shared/lib/utils';
import { cardStyles, textStyles } from '@/music-league/styles/playful-design-system';
import type { FC } from 'react';

interface MyComponentProps {
  title: string;
  children?: React.ReactNode;
}

export const MyComponent: FC<MyComponentProps> = ({ title, children }) => {
  return (
    <div className={cn(cardStyles.coral, 'p-6')}>
      <h3 className={textStyles.heading}>{title}</h3>
      {children}
    </div>
  );
};
```

### Adding a new league category

```typescript
// src/config/leagues.config.ts
export const LEAGUE_CATEGORIES: LeagueCategoryConfig[] = [
  // ... existing categories
  {
    id: 'new-category',           // Folder name in public/data/
    name: 'New Category',         // Display name
    description: 'Description',   // Optional
    themeColor: '#FF6B6B',        // Optional
    leagues: [
      {
        id: 'league-1',
        title: 'League Title',
        fileName: 'league-data.zip',
      },
    ],
  },
];
```

### Creating a test

```typescript
// src/music-league/components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders title', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

## Common Modifications

### Add a new tab

1. Update `TabValue` type in `src/music-league/components/TabNavigation.tsx`
2. Add tab config to `tabs` array
3. Add tab panel in `SimpleMusicLeaguePage.tsx`

### Add a new badge style

Add to `badgeStyles` in `src/music-league/styles/playful-design-system.ts`:

```typescript
export const badgeStyles = {
  // ... existing
  newBadge: `
    inline-flex items-center gap-1
    bg-[#COLOR] text-white
    px-4 py-2 rounded-full
    text-base font-semibold
    min-h-[44px] touch-manipulation
  `,
};
```

### Modify data processing

The `processLeagueZip` function in `src/shared/utils/dataProcessing.ts`:

1. Accepts a config object and base path
2. Fetches and validates the ZIP file
3. Extracts and parses CSV files
4. Computes standings from votes and submissions
5. Returns a `League` object

## Error Handling

- Use `logger` from `@/shared/utils/logger` for logging
- Wrap async operations in try/catch
- Use `Promise.allSettled` for parallel operations
- Display user-friendly error messages in UI

## Performance Considerations

- ZIP processing happens client-side (may be slow for large files)
- Use `useMemo` for expensive computations
- Lazy load components if bundle size grows
- Consider code splitting for large additions

## Don't Do

- Don't use inline styles (use Tailwind classes or design system)
- Don't bypass the design system for colors/spacing
- Don't add dependencies without justification
- Don't commit console.log statements
- Don't create components without proper TypeScript types
