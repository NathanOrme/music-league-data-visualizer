# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

Music League Data Visualizer is a standalone React application for visualizing
Music League data. It processes ZIP files containing CSV exports from Music
League and displays league standings, rounds, and Spotify playlists.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for building
- **Tailwind CSS 4** for styling
- **React Router 7** for navigation
- **Radix UI** for accessible components
- **Motion** (Framer Motion) for animations
- **JSZip** and **PapaParse** for data processing

## Essential Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000
npm run build            # Production build
npm run preview          # Preview production build

# Quality
npm run lint             # ESLint checks
npm run lint:fix         # Auto-fix lint issues
npm run format           # Prettier formatting
npm run format:check     # Check formatting

# Testing
npm run test             # Run Vitest tests
npm run test:watch       # Watch mode
```

## Architecture

### Directory Structure

```
src/
├── config/
│   └── leagues.config.ts      # Dynamic league configuration
├── music-league/
│   ├── components/            # UI components
│   ├── contexts/              # React contexts (LeagueDataContext)
│   ├── pages/                 # Page components
│   └── styles/                # Design system
├── shared/
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI (Button, Card, Accordion)
│   │   └── magicui/           # Magic card effects
│   ├── lib/                   # Utilities (cn function)
│   ├── types/                 # TypeScript types
│   └── utils/                 # Data processing, logging
├── App.tsx                    # Root component with routing
├── main.tsx                   # Entry point
└── index.css                  # Global styles + Tailwind
```

### Key Files

| File | Purpose |
|------|---------|
| `src/config/leagues.config.ts` | League categories and data source configuration |
| `src/music-league/contexts/LeagueDataContext.tsx` | Data fetching and state management |
| `src/shared/utils/dataProcessing.ts` | ZIP/CSV parsing and data transformation |
| `src/music-league/styles/playful-design-system.ts` | Design tokens and style constants |

### Data Flow

1. **Configuration** - `leagues.config.ts` defines categories and league files
2. **Loading** - `LeagueDataContext` fetches ZIP files from `/data/{category}/`
3. **Processing** - `dataProcessing.ts` extracts CSVs and computes standings
4. **Display** - Components consume context and render league data

### Adding New Leagues

1. Place ZIP file in `public/data/{category-id}/`
2. Add entry to `LEAGUE_CATEGORIES` in `src/config/leagues.config.ts`:

```typescript
{
  id: 'category-id',
  name: 'Category Name',
  leagues: [
    { id: 'league-id', title: 'League Title', fileName: 'file.zip' }
  ]
}
```

## Design System

The app uses a custom playful design system with:

- **Colors**: Coral (#FF6B6B), Sky Blue (#4ECDC4), Sunshine (#FFE66D)
- **Dark theme**: Background #1a1a1a, Cards #2a2a2a
- **Rounded corners**: 20px for cards
- **Touch targets**: Minimum 44px
- **Emojis**: Used for visual indicators (👥 participants, 🎵 rounds, 🎧 playlists)

## Key Patterns

### Path Aliases

Use `@/` for imports from `src/`:

```typescript
import { cn } from '@/shared/lib/utils';
import { League } from '@/shared/utils/dataProcessing';
```

### Component Structure

Components follow this pattern:

```typescript
import { styles } from '@/music-league/styles/playful-design-system';
import type { FC } from 'react';

interface MyComponentProps {
  // props
}

export const MyComponent: FC<MyComponentProps> = ({ props }) => {
  return <div className={styles.card}>{/* content */}</div>;
};
```

### State Management

- **Context API** for global state (league data)
- **URL params** for tab navigation (`?tab=playlists`)
- **Local state** for component-specific UI state

## Testing

Tests use Vitest with React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected')).toBeInTheDocument();
  });
});
```

## Common Tasks

### Modify the design system

Edit `src/music-league/styles/playful-design-system.ts` - contains all color
constants, spacing, typography, and component style classes.

### Add a new UI component

1. Create in `src/shared/components/ui/`
2. Export from `src/shared/components/ui/index.ts`
3. Use Radix UI primitives for accessibility

### Debug data loading

- Check browser console for fetch errors
- Verify ZIP files exist in `public/data/{category}/`
- Check `leagues.config.ts` for correct file paths

### Change the layout

Main page layout is in `src/music-league/pages/SimpleMusicLeaguePage.tsx`.
Tab navigation is in `src/music-league/components/TabNavigation.tsx`.

## Dependencies Notes

- **JSZip**: Used for reading ZIP archives client-side
- **PapaParse**: CSV parsing with header support
- **Motion**: Animations via Framer Motion
- **Radix UI**: Only `@radix-ui/react-accordion` and `@radix-ui/react-slot` used

## Environment

- No environment variables required
- Data files served statically from `/public/data/`
- Spotify embeds work without API keys
