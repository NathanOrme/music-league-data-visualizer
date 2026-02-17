# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

Music League Data Visualizer is a standalone React application for visualizing
Music League data. It processes ZIP files containing CSV exports from Music
League and displays league standings, rounds, and Spotify playlists.

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite 7** for building
- **Tailwind CSS 4** for styling
- **React Router 7** for navigation
- **Radix UI** for accessible components (accordion, dialog, dropdown-menu, select, tabs, and more)
- **Motion** (Framer Motion) for animations
- **JSZip** and **PapaParse** for data processing
- **Lucide React** for icons

## Essential Commands

```bash
# Development
npm run dev              # Start dev server on localhost:3000
npm run build            # Production build
npm run preview          # Preview production build

# Quality
npm run lint             # ESLint checks (--max-warnings=0)
npm run lint:fix         # Auto-fix lint issues
npm run format           # Prettier formatting
npm run format:check     # Check formatting

# Testing
npm run test             # Run Vitest tests
npm run test:watch       # Watch mode
npx vitest run src/path/to/file.test.tsx  # Run a single test file
```

## Architecture

### Data Flow

1. **Configuration** — `src/config/leagues.config.ts` defines categories and league files
2. **Loading** — `src/music-league/contexts/LeagueDataContext.tsx` fetches ZIP files from `/data/{category}/`
3. **Processing** — `src/shared/utils/dataProcessing.ts` extracts CSVs and computes standings
4. **Display** — Components consume context and render league data

### Key Files

| File | Purpose |
|------|---------|
| `src/config/leagues.config.ts` | League categories and data source configuration |
| `src/music-league/contexts/LeagueDataContext.tsx` | Data fetching and state management |
| `src/shared/utils/dataProcessing.ts` | ZIP/CSV parsing and data transformation |
| `src/music-league/styles/playful-design-system.ts` | Design tokens and component style classes |
| `src/music-league/pages/SimpleMusicLeaguePage.tsx` | Main page layout |
| `src/music-league/components/TabNavigation.tsx` | Tab navigation |

### Layout

- `src/music-league/` — Domain-specific components, contexts, pages, styles
- `src/shared/` — Reusable components (`ui/`, `magicui/`), types, utilities
- `src/config/` — League configuration
- `public/data/{category-id}/` — Static ZIP data files

### State Management

- **Context API** for global state (league data)
- **URL params** for tab navigation (`?tab=playlists`)
- **Local state** for component-specific UI state

## Key Patterns

### Path Aliases

Use `@/` for imports from `src/`:

```typescript
import { cn } from '@/shared/lib/utils';
import { League } from '@/shared/utils/dataProcessing';
```

### Component Structure

Components use the design system's style classes and `FC` type:

```typescript
import { styles } from '@/music-league/styles/playful-design-system';
import type { FC } from 'react';

export const MyComponent: FC<MyComponentProps> = ({ props }) => {
  return <div className={styles.card}>{/* content */}</div>;
};
```

### ESLint Conventions

- Unused variables must be prefixed with `_` (e.g., `_unusedParam`)
- `--max-warnings=0` means all warnings are treated as errors in CI
- `@typescript-eslint/no-explicit-any` is set to warn

## Design System

Defined in `src/music-league/styles/playful-design-system.ts`:

- **Colors**: Coral (#FF6B6B), Sky Blue (#4ECDC4), Sunshine (#FFE66D)
- **Dark theme**: Background #1a1a1a, Cards #2a2a2a
- **Rounded corners**: 20px for cards
- **Touch targets**: Minimum 44px
- **Emojis**: Used for visual indicators (👥 participants, 🎵 rounds, 🎧 playlists)

## Testing

- **Vitest** with **jsdom** environment and `globals: true` (no need to import `describe`/`it`/`expect`)
- **React Testing Library** for component tests
- Tests live in `__tests__/` directories adjacent to source files
- Setup file: `src/setupTests.ts`

## Adding New Leagues

1. Place ZIP file in `public/data/{category-id}/`
2. Add entry to `LEAGUE_CATEGORIES` in `src/config/leagues.config.ts`

## CI

GitHub Actions runs lint, format check, and build on every push and PR.

## Environment

- No environment variables required
- Data files served statically from `/public/data/`
- Spotify embeds work without API keys
