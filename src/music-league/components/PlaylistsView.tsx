/**
 * @file PlaylistsView.redesigned.tsx
 * @description Hierarchical playlists view matching leagues pattern
 * Pattern: Categories → Leagues → Rounds (consistent with AllLeaguesViewMagicUI)
 */

import {
  ActionButton,
  BlurFade,
  MagicCard,
  NumberTicker,
} from '@/shared/components/magicui';
import { CardContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import type { League } from '@/shared/utils/dataProcessing';
import { ArrowLeft, Music, PlayCircle, Users } from 'lucide-react';
import { type FC, memo, useMemo, useState } from 'react';
import type { LeagueCategory } from './types';

interface PlaylistsViewProps {
  leagueCategories: LeagueCategory[];
  /** Optional filter to show playlists only from a specific league */
  filterByLeagueId?: string;
}

interface PlaylistRound {
  url: string;
  title: string;
  description: string;
  roundIndex: number;
}

/**
 * Redesigned Playlists View with Hierarchical Navigation
 * Matches the pattern from AllLeaguesViewMagicUI
 */
export const PlaylistsView: FC<PlaylistsViewProps> = memo(
  ({ leagueCategories, filterByLeagueId }) => {
    const [selectedCategory, setSelectedCategory] = useState<
      string | null
    >(null);
    const [selectedLeague, setSelectedLeague] =
      useState<League | null>(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState<
      string | null
    >(null);

    // If filterByLeagueId is provided, find and auto-select that league
    const filteredLeague = useMemo(() => {
      if (!filterByLeagueId) {
        return null;
      }

      for (const category of leagueCategories) {
        const league = category.leagues.find(
          (l) => l.title === filterByLeagueId,
        );
        if (league) {
          return league;
        }
      }
      return null;
    }, [filterByLeagueId, leagueCategories]);

    // Get current category data
    const currentCategory = useMemo(() => {
      if (!selectedCategory) {
        return null;
      }
      return leagueCategories.find(
        (cat) => cat.id === selectedCategory,
      );
    }, [selectedCategory, leagueCategories]);

    // Get playlists for selected league
    const leagueRounds = useMemo(() => {
      if (!selectedLeague) {
        return [];
      }

      const rounds: PlaylistRound[] = [];

      // Add round playlists
      selectedLeague.rounds?.forEach((round, index) => {
        if (round.playlist) {
          rounds.push({
            url: round.playlist,
            title: round.name,
            description: round.description || 'Round playlist',
            roundIndex: index,
          });
        }
      });

      return rounds;
    }, [selectedLeague]);

    /**
     * Calculate total playlists for a category
     */
    const getCategoryPlaylistCount = (
      category: LeagueCategory,
    ): number => {
      let count = 0;
      category.leagues.forEach((league) => {
        // Count main playlist
        if (league.urls?.mainPlaylist) {
          count++;
        }
        // Count round playlists
        league.rounds?.forEach((round) => {
          if (round.playlist) {
            count++;
          }
        });
      });
      return count;
    };

    /**
     * Handle playlist play
     */
    const handlePlayPlaylist = (url: string) => {
      setSelectedPlaylist(url);
    };

    /**
     * Handle opening Spotify
     */
    const handleOpenSpotify = (url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    // If filtered by league, show that league's rounds directly
    if (filterByLeagueId && filteredLeague) {
      return renderLeagueRounds(filteredLeague);
    }

    // VIEW 1: Category Selection
    if (!selectedCategory) {
      return (
        <section className="space-y-8 px-4 py-8">
          {/* Header */}
          <BlurFade delay={0.1} direction="up">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎵</div>
              <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
                Music League Playlists
              </h2>
              <p className="text-gray-400 text-lg">
                Discover curated playlists from our community
              </p>
            </div>
          </BlurFade>

          {/* Category Cards */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {leagueCategories.map((category, index) => {
              const playlistCount =
                getCategoryPlaylistCount(category);

              if (playlistCount === 0) {
                return null;
              }

              return (
                <BlurFade
                  key={category.id}
                  delay={0.3 + index * 0.1}
                  direction="up"
                >
                  <MagicCard
                    className="cursor-pointer hover:scale-[1.02] transition-all duration-300 border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm group"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-4xl text-purple-400 p-4 rounded-2xl bg-purple-500/20 border border-purple-500/30 group-hover:border-purple-400/50 transition-colors">
                            {category.icon}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-white font-bold text-2xl group-hover:text-purple-300 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-gray-400 text-sm max-w-md">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-white font-bold text-3xl">
                            <NumberTicker value={playlistCount} />
                            <span className="text-base font-normal ml-2 text-gray-400">
                              playlist{playlistCount !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="text-gray-400 text-sm">
                            <NumberTicker
                              value={category.leagues.length}
                            />
                            <span className="ml-1">leagues</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </MagicCard>
                </BlurFade>
              );
            })}
          </div>
        </section>
      );
    }

    // VIEW 2: League Selection (within category)
    if (selectedCategory && !selectedLeague && currentCategory) {
      return (
        <section className="space-y-8 px-4 py-8">
          {/* Back Button */}
          <BlurFade delay={0.1} direction="up">
            <ActionButton
              onClick={() => setSelectedCategory(null)}
              variant="outline"
              size="sm"
              className="h-9 bg-white/10 hover:bg-white/20 border border-white/20 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </ActionButton>
          </BlurFade>

          {/* Category Header */}
          <BlurFade delay={0.2} direction="up">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {currentCategory.icon}
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                {currentCategory.name}
              </h2>
              <p className="text-gray-400 text-lg">
                {currentCategory.description}
              </p>
            </div>
          </BlurFade>

          {/* League Cards */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {currentCategory.leagues.map((league, index) => {
              const roundCount =
                league.rounds?.filter((r) => r.playlist).length || 0;
              const hasMainPlaylist = Boolean(
                league.urls?.mainPlaylist,
              );
              const totalPlaylists =
                roundCount + (hasMainPlaylist ? 1 : 0);

              if (totalPlaylists === 0) {
                return null;
              }

              return (
                <BlurFade
                  key={league.title}
                  delay={0.3 + index * 0.1}
                  direction="up"
                >
                  <MagicCard
                    className="cursor-pointer hover:scale-[1.02] transition-all duration-300 border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm group"
                    onClick={() => setSelectedLeague(league)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-purple-400 p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 group-hover:border-purple-400/50 transition-colors">
                            <Users className="w-8 h-8" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                              {league.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                              <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <NumberTicker
                                  value={
                                    league.competitors?.length || 0
                                  }
                                />
                                <span>participants</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Music className="w-3 h-3" />
                                <NumberTicker
                                  value={league.rounds?.length || 0}
                                />
                                <span>rounds</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-purple-300 font-bold text-2xl">
                            <NumberTicker value={totalPlaylists} />
                            <span className="text-sm font-normal ml-1 text-gray-400">
                              playlist
                              {totalPlaylists !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </MagicCard>
                </BlurFade>
              );
            })}
          </div>
        </section>
      );
    }

    /**
     * Render league rounds (extracted for reuse in filtered view)
     */
    function renderLeagueRounds(league: League) {
      const rounds: PlaylistRound[] = [];
      league.rounds?.forEach((round, index) => {
        if (round.playlist) {
          rounds.push({
            url: round.playlist,
            title: round.name,
            description: round.description || 'Round playlist',
            roundIndex: index,
          });
        }
      });

      return (
        <section className="space-y-8 px-4 py-8">
          {/* Back Button - only show if not in filtered mode */}
          {!filterByLeagueId && (
            <BlurFade delay={0.1} direction="up">
              <ActionButton
                onClick={() => setSelectedLeague(null)}
                variant="outline"
                size="sm"
                className="h-9 bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Leagues
              </ActionButton>
            </BlurFade>
          )}

          {/* League Info Card */}
          <BlurFade delay={0.2} direction="up">
            <MagicCard className="border-white/20 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-purple-400 p-4 rounded-xl bg-purple-500/20 border border-purple-500/30">
                      <Users className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-white">
                        {league.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <NumberTicker
                            value={league.competitors?.length || 0}
                          />
                          <span>participants</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Music className="w-4 h-4" />
                          <NumberTicker
                            value={league.rounds?.length || 0}
                          />
                          <span>rounds</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </MagicCard>
          </BlurFade>

          {/* Central Spotify Player */}
          {selectedPlaylist && (
            <BlurFade delay={0.3} direction="up">
              <div className="max-w-4xl mx-auto">
                <MagicCard className="border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="bg-black/20 rounded-lg p-1">
                      <iframe
                        src={`https://open.spotify.com/embed/playlist/${selectedPlaylist.split('/playlist/')[1] || selectedPlaylist.split('/')?.pop()}`}
                        width="100%"
                        height="380"
                        className="rounded-lg border-none"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Selected Playlist Player"
                      />
                    </div>
                    <div className="flex justify-center mt-4">
                      <ActionButton
                        onClick={() => setSelectedPlaylist(null)}
                        variant="outline"
                        size="sm"
                        className="h-9 bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                      >
                        Close Player
                      </ActionButton>
                    </div>
                  </CardContent>
                </MagicCard>
              </div>
            </BlurFade>
          )}

          {/* Main League Playlist (if exists) */}
          {league.urls?.mainPlaylist && (
            <BlurFade delay={0.4} direction="up">
              <div className="max-w-4xl mx-auto">
                <MagicCard
                  className={cn(
                    'hover:scale-[1.01] transition-all duration-300 border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm',
                    selectedPlaylist ===
                      selectedLeague.urls.mainPlaylist &&
                      'ring-2 ring-purple-500/30 border-purple-500/50',
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-semibold text-white">
                          🎼 Complete Collection
                        </h4>
                        <p className="text-gray-400">
                          All songs from all rounds in one playlist
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <ActionButton
                          onClick={() =>
                            handlePlayPlaylist(
                              league.urls!.mainPlaylist,
                            )
                          }
                          variant="primary"
                          size="lg"
                          className={cn(
                            'bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700',
                            selectedPlaylist ===
                              league.urls.mainPlaylist &&
                              'from-purple-700 to-teal-700',
                          )}
                        >
                          <PlayCircle className="w-5 h-5 mr-2" />
                          {selectedPlaylist ===
                          league.urls.mainPlaylist
                            ? 'Playing'
                            : 'Play Here'}
                        </ActionButton>
                        <ActionButton
                          onClick={() =>
                            handleOpenSpotify(
                              league.urls!.mainPlaylist,
                            )
                          }
                          variant="outline"
                          size="lg"
                          className="border-green-500/30 text-green-300 hover:bg-green-500/10"
                        >
                          Open in Spotify
                        </ActionButton>
                      </div>
                    </div>
                  </CardContent>
                </MagicCard>
              </div>
            </BlurFade>
          )}

          {/* Round Playlists Grid */}
          {rounds.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <BlurFade delay={0.5} direction="up">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Round Playlists
                </h3>
              </BlurFade>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rounds.map((round, index) => (
                  <BlurFade
                    key={round.url}
                    delay={0.6 + index * 0.05}
                    direction="up"
                  >
                    <MagicCard
                      className={cn(
                        'hover:scale-[1.02] transition-all duration-300 border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm',
                        selectedPlaylist === round.url &&
                          'ring-2 ring-teal-500/30 border-teal-500/50',
                      )}
                    >
                      <CardContent className="p-5">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30 mb-3">
                                🎵 Round {round.roundIndex + 1}
                              </span>
                              <h4 className="text-lg font-semibold text-white line-clamp-2 mt-2">
                                {round.title}
                              </h4>
                              {round.description && (
                                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                  {round.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 pt-2">
                            <ActionButton
                              onClick={() =>
                                handlePlayPlaylist(round.url)
                              }
                              variant="primary"
                              size="sm"
                              className={cn(
                                'w-full h-10 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700',
                                selectedPlaylist === round.url &&
                                  'from-teal-700 to-cyan-700',
                              )}
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              {selectedPlaylist === round.url
                                ? 'Playing'
                                : 'Play Here'}
                            </ActionButton>
                            <ActionButton
                              onClick={() =>
                                handleOpenSpotify(round.url)
                              }
                              variant="outline"
                              size="sm"
                              className="w-full h-9 border-green-500/30 text-green-300 hover:bg-green-500/10"
                            >
                              Open in Spotify
                            </ActionButton>
                          </div>
                        </div>
                      </CardContent>
                    </MagicCard>
                  </BlurFade>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {rounds.length === 0 && !league.urls?.mainPlaylist && (
            <BlurFade delay={0.4} direction="up">
              <MagicCard className="border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🎧</div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      No Playlists Available
                    </h3>
                    <p className="text-gray-300">
                      This league doesn&apos;t have any playlists yet
                    </p>
                  </div>
                </CardContent>
              </MagicCard>
            </BlurFade>
          )}
        </section>
      );
    }

    // VIEW 3: Round Playlists (within league)
    if (selectedLeague) {
      return renderLeagueRounds(selectedLeague);
    }

    return null;
  },
);

PlaylistsView.displayName = 'PlaylistsView';
