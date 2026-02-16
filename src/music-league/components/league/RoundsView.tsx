/**
 * @file RoundsView.tsx
 * @description Displays league rounds with pagination, search, and grid layout for scalability
 */

import {
  BlurFade,
  MagicCard,
  NumberTicker,
  RainbowButton,
} from '@/shared/components/magicui';
import { Button, CardContent } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { League } from '@/shared/utils/dataProcessing';
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Music,
  PlayCircle,
  Search,
  Target,
  X,
} from 'lucide-react';
import { type FC, useMemo, useState } from 'react';

export interface RoundsViewProps {
  /** League data containing rounds */
  league: League;
  /** Selected playlist URL */
  selectedPlaylist: string | null;
  /** Callback when playlist is selected */
  onPlaylistSelect: (url: string) => void;
}

const ROUNDS_PER_PAGE = 12;

/**
 * Rounds view component with pagination and search for scalability
 */
export const RoundsView: FC<RoundsViewProps> = ({
  league,
  selectedPlaylist,
  onPlaylistSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRound, setSelectedRound] = useState<string | null>(
    null,
  );

  const rounds = league.rounds || [];

  // Filter rounds based on search query
  const filteredRounds = useMemo(() => {
    if (!searchQuery) {
      return rounds;
    }

    const query = searchQuery.toLowerCase();
    return rounds.filter(
      (round, index) =>
        round.name.toLowerCase().includes(query) ||
        round.description?.toLowerCase().includes(query) ||
        `round ${index + 1}`.includes(query),
    );
  }, [rounds, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(
    filteredRounds.length / ROUNDS_PER_PAGE,
  );
  const paginatedRounds = useMemo(() => {
    const startIndex = (currentPage - 1) * ROUNDS_PER_PAGE;
    return filteredRounds.slice(
      startIndex,
      startIndex + ROUNDS_PER_PAGE,
    );
  }, [filteredRounds, currentPage]);

  // Reset page when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Get round details
  const getSelectedRoundData = () => {
    if (!selectedRound) {
      return null;
    }

    const round = rounds.find((r) => r.id === selectedRound);
    if (!round) {
      return null;
    }

    const roundSubmissions =
      league.submissions?.filter((s) => s['Round ID'] === round.id) ||
      [];
    const roundVotes =
      league.votes?.filter((v) => v['Round ID'] === round.id) || [];

    return { round, roundSubmissions, roundVotes };
  };

  const selectedRoundData = getSelectedRoundData();

  if (rounds.length === 0) {
    return (
      <BlurFade delay={0.2} inView>
        <MagicCard className="border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Rounds Available
              </h3>
              <p className="text-gray-300">
                This league doesn't have round data yet
              </p>
            </div>
          </CardContent>
        </MagicCard>
      </BlurFade>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <BlurFade delay={0.1} inView>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Target className="w-8 h-8 text-purple-400" />
              League Rounds
            </h2>
            <div className="text-gray-400 text-sm">
              {filteredRounds.length} of {rounds.length} rounds
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search rounds..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </BlurFade>

      {/* Round Cards Grid */}
      <BlurFade delay={0.2} inView>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedRounds.map((round, index) => {
            const roundIndex = rounds.findIndex(
              (r) => r.id === round.id,
            );
            const roundNumber = roundIndex + 1;
            const isSelected = selectedRound === round.id;

            return (
              <MagicCard
                key={round.id}
                className={cn(
                  'cursor-pointer transition-all duration-300 hover:scale-105',
                  'border backdrop-blur-sm',
                  isSelected
                    ? 'border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-pink-500/30 shadow-lg'
                    : 'border-white/10 bg-gradient-to-br from-white/5 to-white/10 hover:border-purple-500/30',
                )}
                onClick={() =>
                  setSelectedRound(isSelected ? null : round.id)
                }
              >
                <CardContent className="p-4 space-y-3">
                  {/* Round Number Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        'px-3 py-1 rounded-full text-sm font-bold',
                        isSelected
                          ? 'bg-purple-500/30 text-purple-300'
                          : 'bg-white/10 text-gray-300',
                      )}
                    >
                      Round {roundNumber}
                    </div>
                    {round.playlist && (
                      <PlayCircle
                        className={cn(
                          'w-5 h-5',
                          isSelected
                            ? 'text-purple-300'
                            : 'text-purple-400',
                        )}
                      />
                    )}
                  </div>

                  {/* Round Name */}
                  <h3
                    className={cn(
                      'text-lg font-bold line-clamp-2',
                      isSelected ? 'text-white' : 'text-gray-200',
                    )}
                  >
                    {round.name}
                  </h3>

                  {/* Round Description */}
                  {round.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {round.description}
                    </p>
                  )}

                  {/* Quick Stats */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <div className="text-xs text-gray-400">
                      {league.submissions?.filter(
                        (s) => s['Round ID'] === round.id,
                      ).length || 0}{' '}
                      songs
                    </div>
                    <span className="text-gray-600">•</span>
                    <div className="text-xs text-gray-400">
                      {league.votes?.filter(
                        (v) => v['Round ID'] === round.id,
                      ).length || 0}{' '}
                      votes
                    </div>
                  </div>
                </CardContent>
              </MagicCard>
            );
          })}
        </div>
      </BlurFade>

      {/* Pagination */}
      {totalPages > 1 && (
        <BlurFade delay={0.3} inView>
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from(
                { length: totalPages },
                (_, i) => i + 1,
              ).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1;

                if (!showPage) {
                  // Show ellipsis
                  if (page === 2 && currentPage > 3) {
                    return (
                      <span key={page} className="text-gray-400 px-2">
                        ...
                      </span>
                    );
                  }
                  if (
                    page === totalPages - 1 &&
                    currentPage < totalPages - 2
                  ) {
                    return (
                      <span key={page} className="text-gray-400 px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      'px-4 py-2 rounded-lg border',
                      currentPage === page
                        ? 'bg-purple-500/30 border-purple-500/50 text-white'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20',
                    )}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </BlurFade>
      )}

      {/* Selected Round Details Modal */}
      {selectedRoundData && (
        <BlurFade delay={0.1} inView key={selectedRound}>
          <MagicCard className="border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
            <CardContent className="p-6 space-y-6">
              {/* Round Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedRoundData.round.name}
                  </h3>
                  {selectedRoundData.round.description && (
                    <p className="text-gray-400">
                      {selectedRoundData.round.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedRound(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Round Stats */}
              <div className="grid grid-cols-3 gap-4">
                <MagicCard className="cursor-pointer border-purple-500/20 bg-purple-500/10">
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-purple-300 mb-1">
                      <NumberTicker
                        value={
                          selectedRoundData.roundSubmissions.length
                        }
                      />
                    </div>
                    <div className="text-gray-400 text-xs">
                      Submissions
                    </div>
                  </div>
                </MagicCard>

                <MagicCard className="cursor-pointer border-green-500/20 bg-green-500/10">
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-green-300 mb-1">
                      <NumberTicker
                        value={selectedRoundData.roundVotes.length}
                      />
                    </div>
                    <div className="text-gray-400 text-xs">Votes</div>
                  </div>
                </MagicCard>

                <MagicCard className="cursor-pointer border-blue-500/20 bg-blue-500/10">
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-blue-300 mb-1">
                      <NumberTicker
                        value={
                          selectedRoundData.round.standings?.length ||
                          0
                        }
                      />
                    </div>
                    <div className="text-gray-400 text-xs">
                      Players
                    </div>
                  </div>
                </MagicCard>
              </div>

              {/* Round Winner */}
              {selectedRoundData.round.standings &&
                selectedRoundData.round.standings.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
                    <h5 className="text-white font-bold mb-3 flex items-center gap-2">
                      <Crown className="w-5 h-5 text-yellow-400" />
                      Round Winner
                    </h5>
                    <div className="text-gray-300">
                      <span className="text-white font-bold text-lg">
                        {selectedRoundData.round.standings[0].name}
                      </span>
                      {' • '}
                      <span className="text-gray-400">
                        &quot;
                        {selectedRoundData.round.standings[0].song}
                        &quot; •{' '}
                        <span className="text-yellow-300 font-semibold">
                          {
                            selectedRoundData.round.standings[0]
                              .points
                          }{' '}
                          points
                        </span>
                      </span>
                    </div>
                  </div>
                )}

              {/* Playlist Button */}
              {selectedRoundData.round.playlist && (
                <div className="flex justify-center">
                  <RainbowButton
                    onClick={() =>
                      onPlaylistSelect(
                        selectedRoundData.round.playlist!,
                      )
                    }
                    className={cn(
                      'px-6 py-3',
                      selectedPlaylist ===
                        selectedRoundData.round.playlist &&
                        'opacity-75',
                    )}
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                      {selectedPlaylist ===
                      selectedRoundData.round.playlist
                        ? 'Playing Now'
                        : 'Play Round Playlist'}
                    </span>
                  </RainbowButton>
                </div>
              )}

              {/* Top Submissions */}
              {selectedRoundData.roundSubmissions.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-white font-semibold flex items-center gap-2">
                    <Music className="w-4 h-4 text-purple-400" />
                    Top Submissions
                  </h5>
                  <div className="space-y-2">
                    {selectedRoundData.roundSubmissions
                      .slice(0, 5)
                      .map((submission, subIndex) => (
                        <div
                          key={`${submission.Title}-${subIndex}`}
                          className="flex items-center gap-3 p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors"
                        >
                          <PlayCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-sm font-semibold truncate">
                              {submission.Title}
                            </div>
                            <div className="text-gray-400 text-xs truncate">
                              by {submission['Artist(s)']} •{' '}
                              {submission['Submitter ID']}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </MagicCard>
        </BlurFade>
      )}
    </div>
  );
};

export default RoundsView;
