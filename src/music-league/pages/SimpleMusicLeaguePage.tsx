/**
 * @file SimpleMusicLeaguePage.tsx
 * @description Simplified Music League single-page experience
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
import { Search } from 'lucide-react';
import { memo, useContext, useEffect, useMemo, useState, type FC } from 'react';
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

const SimpleMusicLeaguePage: FC = memo(() => {
  const { leaguesData, loading, error } = useContext(LeagueDataContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTabParam = searchParams.get('tab');
  const initialTab: TabValue =
    initialTabParam === 'playlists' ? 'playlists' : 'leagues';
  const [activeTab, setActiveTab] = useState<TabValue>(initialTab);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const nextTab: TabValue =
      tabParam === 'playlists' ? 'playlists' : 'leagues';

    if (nextTab !== activeTab) {
      setActiveTab(nextTab);
    }
  }, [activeTab, searchParams]);

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

  const filteredLeagues = useMemo(() => {
    if (!searchQuery) {
      return allLeagues;
    }
    const query = searchQuery.toLowerCase();
    return allLeagues.filter((league) =>
      league.title.toLowerCase().includes(query),
    );
  }, [allLeagues, searchQuery]);

  const stats = useMemo(() => {
    const totalParticipants = getParticipantCount(allLeagues);
    const totalRounds = allLeagues.reduce((sum, l) => sum + l.rounds.length, 0);

    return {
      leagues: allLeagues.length,
      participants: totalParticipants,
      rounds: totalRounds,
    };
  }, [allLeagues]);

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  if (loading) {
    return (
      <div className={containerStyles.page}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="animate-bounce text-6xl">{emojis.music}</div>
            <p className={textStyles.heading}>Loading leagues...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerStyles.page}>
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-md space-y-4 text-center">
            <div className="text-6xl">😔</div>
            <h2 className={textStyles.heading}>Oops! Something went wrong</h2>
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
        className="pointer-events-none fixed inset-0 overflow-hidden"
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
          <p className={cn(textStyles.body, 'mx-auto mb-6 max-w-2xl')}>
            Explore leagues, discover playlists, and celebrate the best music
            picks!
          </p>

          {/* Quick Stats */}
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            <div className="rounded-2xl border-2 border-[#FF6B6B] bg-[#2a2a2a] px-6 py-3 shadow-md shadow-[#FF6B6B]/20">
              <span className="text-2xl font-black text-[#FF6B6B]">
                {stats.leagues}
              </span>
              <span className="ml-2 text-sm font-medium text-[#e0e0e0]">
                Leagues
              </span>
            </div>
            <div className="rounded-2xl border-2 border-[#4ECDC4] bg-[#2a2a2a] px-6 py-3 shadow-md shadow-[#4ECDC4]/20">
              <span className="text-2xl font-black text-[#4ECDC4]">
                {stats.participants}
              </span>
              <span className="ml-2 text-sm font-medium text-[#e0e0e0]">
                Players
              </span>
            </div>
            <div className="rounded-2xl border-2 border-[#FFE66D] bg-[#2a2a2a] px-6 py-3 shadow-md shadow-[#FFE66D]/20">
              <span className="text-2xl font-black text-[#FFE66D]">
                {stats.rounds}
              </span>
              <span className="ml-2 text-sm font-medium text-[#e0e0e0]">
                Rounds
              </span>
            </div>
          </div>

          {/* Emoji Legend */}
          <div className="mb-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="text-[#b0b0b0]">Legend:</span>
            {emojiLegend.map(({ emoji, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1 rounded-full border border-[#3a3a3a] bg-[#2a2a2a]/80 px-3 py-1"
              >
                <span className="text-lg">{emoji}</span>
                <span className="font-medium text-[#e0e0e0]">{label}</span>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <div className={searchStyles.container}>
              <input
                type="search"
                placeholder={`${emojis.search} Search leagues and playlists...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={searchStyles.input}
                aria-label="Search leagues and playlists"
              />
              <Search className={searchStyles.icon} aria-hidden="true" />
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

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
                <div className="py-20 text-center">
                  <p className={textStyles.heading}>No leagues found</p>
                  <p className={textStyles.body}>Try a different search term</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                  {filteredLeagues.map((league) => (
                    <LeagueAccordionCard key={league.title} league={league} />
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

export default function PageWrapper() {
  return (
    <LeagueDataProvider>
      <ErrorBoundary>
        <SimpleMusicLeaguePage />
      </ErrorBoundary>
    </LeagueDataProvider>
  );
}
