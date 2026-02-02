/**
 * @file leagues.config.ts
 * @description Dynamic league configuration
 *
 * Add new leagues by adding entries to the LEAGUE_CATEGORIES array.
 * Each category can have multiple leagues with their own data files.
 *
 * Data files should be placed in: public/data/{category-id}/
 */

export interface LeagueConfig {
  /** Unique identifier for the league */
  id: string;
  /** Display title shown in the UI */
  title: string;
  /** Filename of the ZIP archive (without path) */
  fileName: string;
}

export interface LeagueCategoryConfig {
  /** Unique identifier for the category */
  id: string;
  /** Display name for the category */
  name: string;
  /** Description of this category */
  description?: string;
  /** Color theme for this category (hex) */
  themeColor?: string;
  /** List of leagues in this category */
  leagues: LeagueConfig[];
}

/**
 * League Categories Configuration
 *
 * To add a new league:
 * 1. Add an entry to the appropriate category below (or create a new category)
 * 2. Place the ZIP file in public/data/{category-id}/
 * 3. The app will automatically load it
 */
export const LEAGUE_CATEGORIES: LeagueCategoryConfig[] = [
  {
    id: '1001-leagues',
    name: '1001 Leagues',
    description: 'The main 1001 Leagues series',
    themeColor: '#FF6B6B',
    leagues: [
      {
        id: 'under-the-sea',
        title: '1001 Leagues Under The Sea',
        fileName: '1001LeaguesUnderTheSea.zip',
      },
      {
        id: 'electric-boogaloo',
        title: '1001 Leagues 2: Electric Boogaloo',
        fileName: 'electricBoogaloo.zip',
      },
      {
        id: 'with-a-vengeance',
        title: '1001 Leagues 3: With A Vengeance',
        fileName: 'withAVengeance.zip',
      },
      {
        id: 'a-to-z',
        title: '1001 Leagues 4: A To Z',
        fileName: 'aToZ.zip',
      },
      {
        id: 'situations',
        title: '1001 Leagues 5: Situations',
        fileName: 'situations.zip',
      },
      {
        id: 'the-return',
        title: '1001 Leagues 6: The Return',
        fileName: 'musicLeagueIsBack.zip',
      },
    ],
  },
  {
    id: 'words-leagues',
    name: '1001 Words',
    description: 'Word-themed music leagues',
    themeColor: '#4ECDC4',
    leagues: [
      {
        id: 'words-1',
        title: '1001 Words',
        fileName: '1001Words.zip',
      },
      {
        id: 'words-2',
        title: '1001 Words 2',
        fileName: '1001Words2.zip',
      },
    ],
  },
  {
    id: 'coffee-leagues',
    name: 'Coffee & Tunes',
    description: 'Coffee-themed music leagues',
    themeColor: '#95E1D3',
    leagues: [
      {
        id: 'coffee-1',
        title: 'Coffee & Tunes',
        fileName: 'coffee.zip',
      },
    ],
  },
  {
    id: 'hos-leagues',
    name: 'Head of Steam',
    description: 'Head of Steam Enthusiasts leagues',
    themeColor: '#FFE66D',
    leagues: [
      {
        id: 'hos-1',
        title: 'Head of Steam Enthusiasts',
        fileName: 'first.zip',
      },
    ],
  },
];

/**
 * Get the data path for a league category
 */
export function getLeagueDataPath(categoryId: string): string {
  return `/data/${categoryId}`;
}

/**
 * Get all league files with their full configuration
 */
export function getAllLeagueFiles(): Array<{
  categoryId: string;
  categoryName: string;
  league: LeagueConfig;
  dataPath: string;
}> {
  return LEAGUE_CATEGORIES.flatMap((category) =>
    category.leagues.map((league) => ({
      categoryId: category.id,
      categoryName: category.name,
      league,
      dataPath: getLeagueDataPath(category.id),
    })),
  );
}

/**
 * Get category by ID
 */
export function getCategoryById(
  categoryId: string,
): LeagueCategoryConfig | undefined {
  return LEAGUE_CATEGORIES.find((c) => c.id === categoryId);
}
