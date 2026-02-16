/**
 * @file SimpleMusicLeaguePage.tsx
 * @description Simplified Music League single-page experience
 *
 * Features:
 * - Mobile-first, playful design (completely unique from portfolio)
 * - Single-page journey with tab navigation
 * - Leagues tab: Accordion cards (single-expand)
 * - Playlists tab: Gallery grouped by league
 * - Search functionality across leagues and playlists
 * - URL state management (?tab=playlists)
 * - Zero analytics (ExploreDataView removed)
 *
 * Design System:
 * - Bright colors: coral (#FF6B6B), sky blue (#4ECDC4), sunshine (#FFE66D)
 * - Rounded corners (20px), colorful shadows, bouncy animations
 * - Emoji-driven visual language
 * - Bottom nav (mobile), top tabs (desktop)
 */

import { LeagueAccordionCard } from '@/music-league/components/LeagueAccordionCard';
import { PlaylistsGallery } from '@/music-league/components/PlaylistsGallery';
import {
  TabNavigation,
  type TabValue,
} from '@/music-league/components/TabNavigation';
import {
  LeagueDataContext,
  LeagueDataProvider,
} from '@/music-league/contexts/LeagueDataContext';
import {
  backgroundEmojis,
  cn,
  containerStyles,
  emojiLegend,
  emojis,
  searchStyles,
  textStyles,
} from '@/music-league/styles/playful-design-system';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import type { League } from '@/shared/utils/dataProcessing';
import { SEOHelmet } from '@/shared/utils/seo';
import { Search } from 'lucide-react';
import {
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
} from 'react';
import { useSearchParams } from 'react-router-dom';

export const getParticipantCount = (leagues: League[]): number => {
  const names = new Set<string>();
  leagues.forEach((league) => {
    league.leagueStandings.forEach((standing) => {
      const legacyStanding = standing as { Name?: string };
      const name = standing.name || legacyStanding.Name;
      if (name) {
        names.add(name);
      }
    });
  });
  return names.size;
};

/**
 * SimpleMusicLeaguePage Component
 *
 * Main single-page container with:
 * - Hero section with quick stats
 * - Search bar
 * - Tab navigation (Leagues | Playlists)
 * - Responsive content area
 */
const SimpleMusicLeaguePage: FC = memo(() => {
  const { leaguesData, loading, error } =
    useContext(LeagueDataContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state from URL (default: 'leagues')
  const initialTabParam = searchParams.get('tab');
  const initialTab: TabValue =
    initialTabParam === 'playlists' ? 'playlists' : 'leagues';
  const [activeTab, setActiveTab] = useState<TabValue>(initialTab);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Keep tab in sync when navigation updates the query string (e.g., navbar links)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const nextTab: TabValue =
      tabParam === 'playlists' ? 'playlists' : 'leagues';

    if (nextTab !== activeTab) {
      setActiveTab(nextTab);
    }
  }, [activeTab, searchParams]);

  // Extract all leagues from leaguesData
  const allLeagues = useMemo(() => {
    if (!leaguesData) {
      return [];
    }
    const leagues: League[] = [];
    Object.values(leaguesData).forEach((leagueArray) => {
      if (Array.isArray(leagueArray)) {
        leagues.push(...leagueArray);
      }
    });
    return leagues;
  }, [leaguesData]);

  // Filter leagues based on search query
  const filteredLeagues = useMemo(() => {
    if (!searchQuery) {
      return allLeagues;
    }
    const query = searchQuery.toLowerCase();
    return allLeagues.filter((league) =>
      league.title.toLowerCase().includes(query),
    );
  }, [allLeagues, searchQuery]);

  // Quick stats for hero
  const stats = useMemo(() => {
    const totalParticipants = getParticipantCount(allLeagues);
    const totalRounds = allLeagues.reduce(
      (sum, l) => sum + l.rounds.length,
      0,
    );

    return {
      leagues: allLeagues.length,
      participants: totalParticipants,
      rounds: totalRounds,
    };
  }, [allLeagues]);

  // Handle tab change
  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Loading state
  if (loading) {
    return (
      <div className={containerStyles.page}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">
              {emojis.music}
            </div>
            <p className={textStyles.heading}>Loading leagues...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={containerStyles.page}>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4 max-w-md">
            <div className="text-6xl">😔</div>
            <h2 className={textStyles.heading}>
              Oops! Something went wrong
            </h2>
            <p className={textStyles.body}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyles.page}>
      {/* Decorative Background Emojis */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {backgroundEmojis.map((emoji, index) => (
          <div
            key={index}
            className={cn(
              'absolute',
              emoji.size,
              emoji.position,
              emoji.opacity,
              'select-none',
            )}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className={containerStyles.hero}>
          <h1 className={textStyles.hero}>Music League Community</h1>
          <p
            className={cn(textStyles.body, 'max-w-2xl mx-auto mb-6')}
          >
            Explore leagues, discover playlists, and celebrate the
            best music picks!
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-[#2a2a2a] rounded-2xl px-6 py-3 shadow-md shadow-[#FF6B6B]/20 border-2 border-[#FF6B6B]">
              <span className="text-2xl font-black text-[#FF6B6B]">
                {stats.leagues}
              </span>
              <span className="text-sm text-[#e0e0e0] ml-2 font-medium">
                Leagues
              </span>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl px-6 py-3 shadow-md shadow-[#4ECDC4]/20 border-2 border-[#4ECDC4]">
              <span className="text-2xl font-black text-[#4ECDC4]">
                {stats.participants}
              </span>
              <span className="text-sm text-[#e0e0e0] ml-2 font-medium">
                Players
              </span>
            </div>
            <div className="bg-[#2a2a2a] rounded-2xl px-6 py-3 shadow-md shadow-[#FFE66D]/20 border-2 border-[#FFE66D]">
              <span className="text-2xl font-black text-[#FFE66D]">
                {stats.rounds}
              </span>
              <span className="text-sm text-[#e0e0e0] ml-2 font-medium">
                Rounds
              </span>
            </div>
          </div>

          {/* Emoji Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
            <span className="text-[#b0b0b0]">Legend:</span>
            {emojiLegend.map(({ emoji, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1 px-3 py-1 bg-[#2a2a2a]/80 border border-[#3a3a3a] rounded-full"
              >
                <span className="text-lg">{emoji}</span>
                <span className="text-[#e0e0e0] font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className={searchStyles.container}>
              <input
                type="search"
                placeholder={`${emojis.search} Search leagues and playlists...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={searchStyles.input}
                aria-label="Search leagues and playlists"
              />
              <Search
                className={searchStyles.icon}
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab Content */}
        <main className={containerStyles.content}>
          {/* Leagues Tab */}
          {activeTab === 'leagues' && (
            <div
              role="tabpanel"
              id="leagues-panel"
              aria-labelledby="leagues-tab"
              className="space-y-6"
            >
              {filteredLeagues.length === 0 ? (
                <div className="text-center py-20">
                  <p className={textStyles.heading}>
                    No leagues found
                  </p>
                  <p className={textStyles.body}>
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                  {filteredLeagues.map((league) => (
                    <LeagueAccordionCard
                      key={league.title}
                      league={league}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Playlists Tab */}
          {activeTab === 'playlists' && (
            <div
              role="tabpanel"
              id="playlists-panel"
              aria-labelledby="playlists-tab"
            >
              <PlaylistsGallery leagues={filteredLeagues} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
});

SimpleMusicLeaguePage.displayName = 'SimpleMusicLeaguePage';

/**
 * PageWrapper Component
 *
 * Wraps SimpleMusicLeaguePage with data provider, error boundary, and SEO
 */
export default function PageWrapper() {
  return (
    <>
      <SEOHelmet
        pageKey="music-league"
        path="/music-league"
        appName="Music League Community"
        appDescription="Explore music leagues, discover curated playlists, and celebrate the best music picks in our playful community experience created by Nathan Orme"
        appCategory="WebApplication"
      />
      <LeagueDataProvider>
        <ErrorBoundary>
          <SimpleMusicLeaguePage />
        </ErrorBoundary>
      </LeagueDataProvider>
    </>
  );
}
