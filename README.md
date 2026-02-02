# Music League Data Visualizer

A playful, mobile-first web application for visualizing Music League data, exploring league standings, and discovering curated Spotify playlists.

![Music League](public/music-league.svg)

## Features

- **League Explorer** - Browse all your music leagues with expandable cards showing standings, rounds, and statistics
- **Playlist Gallery** - Discover and play curated Spotify playlists from league rounds
- **Embedded Spotify Player** - Listen to playlists directly in the app
- **Search** - Filter leagues and playlists by name
- **Responsive Design** - Mobile-first design with desktop optimization
- **Dark Theme** - Beautiful dark theme with colorful, playful accents
- **Dynamic Configuration** - Easy-to-configure league categories and data sources

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 7.x | Build Tool |
| Tailwind CSS | 4.x | Styling |
| React Router | 7.x | Routing |
| Radix UI | Latest | Accessible Components |
| Lucide React | Latest | Icons |
| Motion | 12.x | Animations |
| JSZip | 3.x | ZIP Processing |
| PapaParse | 5.x | CSV Parsing |

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/music-league-data-visualizer.git
cd music-league-data-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:3000

### Building for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## Adding Your League Data

### Data Format

The app processes Music League data exported as ZIP files. Each ZIP should contain CSV files exported from Music League:

- `competitors.csv` - List of participants
- `rounds.csv` - Round information with playlist URLs
- `submissions.csv` - Song submissions
- `votes.csv` - Voting data

### Directory Structure

Place your ZIP files in the `public/data/` directory, organized by category:

```
public/
└── data/
    ├── 1001-leagues/          # Main leagues category
    │   ├── league1.zip
    │   └── league2.zip
    ├── words-leagues/         # Word-themed leagues
    │   └── words1.zip
    ├── coffee-leagues/        # Coffee-themed leagues
    │   └── coffee.zip
    └── hos-leagues/           # Head of Steam leagues
        └── hos1.zip
```

### Configuring Leagues

Edit `src/config/leagues.config.ts` to add or modify leagues:

```typescript
export const LEAGUE_CATEGORIES: LeagueCategoryConfig[] = [
  {
    id: 'my-category',           // Unique ID (matches folder name in public/data/)
    name: 'My Leagues',          // Display name
    description: 'Description',   // Optional description
    themeColor: '#FF6B6B',       // Optional theme color
    leagues: [
      {
        id: 'league-1',
        title: 'My First League',
        fileName: 'my-league.zip',  // Filename in public/data/my-category/
      },
    ],
  },
];
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
music-league-data-visualizer/
├── public/
│   ├── data/                    # League data ZIP files
│   │   ├── 1001-leagues/
│   │   ├── words-leagues/
│   │   ├── coffee-leagues/
│   │   └── hos-leagues/
│   └── music-league.svg         # Favicon
├── src/
│   ├── config/
│   │   └── leagues.config.ts    # League configuration
│   ├── music-league/
│   │   ├── components/          # UI components
│   │   │   ├── LeagueAccordionCard.tsx
│   │   │   ├── PlaylistsGallery.tsx
│   │   │   ├── SpotifyPlayer.tsx
│   │   │   └── TabNavigation.tsx
│   │   ├── contexts/
│   │   │   └── LeagueDataContext.tsx
│   │   ├── pages/
│   │   │   └── SimpleMusicLeaguePage.tsx
│   │   └── styles/
│   │       └── playful-design-system.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── magicui/         # Magic card effects
│   │   │   └── ui/              # Base UI components
│   │   ├── lib/
│   │   │   └── utils.ts         # Utility functions
│   │   ├── types/
│   │   │   └── leagueTypes.ts
│   │   └── utils/
│   │       ├── dataProcessing.ts
│   │       └── logger.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Design System

The app uses a custom playful design system defined in `src/music-league/styles/playful-design-system.ts`:

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Coral | `#FF6B6B` | Primary accent, league cards |
| Sky Blue | `#4ECDC4` | Secondary accent, playlists |
| Sunshine | `#FFE66D` | Highlights, badges |
| Mint | `#95E1D3` | Tertiary accent |
| Dark BG | `#1a1a1a` | Background |
| Dark Card | `#2a2a2a` | Card backgrounds |

### Design Principles

- **Mobile-First** - Designed for mobile with desktop enhancements
- **Touch-Optimized** - Minimum 44px touch targets
- **Playful** - Rounded corners (20px), colorful shadows, emoji icons
- **Accessible** - WCAG 2.1 AA compliant color contrast
- **Dark Theme** - Easy on the eyes with vibrant accents

## CI/CD

GitHub Actions workflow runs on every push and pull request:

1. **Lint** - ESLint checks
2. **Format** - Prettier formatting verification
3. **Build** - Production build verification
4. **Artifacts** - Build artifacts uploaded for deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Music League](https://app.musicleague.com/) for the platform
- [Spotify](https://spotify.com/) for the embed player
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
