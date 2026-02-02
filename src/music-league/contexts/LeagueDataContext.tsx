import {
  LEAGUE_CATEGORIES,
  getLeagueDataPath,
  type LeagueCategoryConfig,
} from '@/config/leagues.config';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { League } from '@/shared/utils/dataProcessing';
import { processLeagueZip } from '@/shared/utils/dataProcessing';
import { logger } from '@/shared/utils/logger';
import type { FC, JSX, ReactNode } from 'react';

/**
 * Type representing the data structure for leagues.
 * Keys are category IDs from the configuration.
 */
export type LeaguesData = Record<string, League[] | null>;

interface LeagueDataContextProps {
  /** All leagues organized by category */
  leaguesData: LeaguesData;
  /** Category configurations */
  categories: LeagueCategoryConfig[];
  /** Loading state */
  loading: boolean;
  /** Error message if loading failed */
  error: string | null;
  /** Refetch all league data */
  refetch: () => void;
}

const initialLeaguesData: LeaguesData = LEAGUE_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = null;
    return acc;
  },
  {} as LeaguesData,
);

export const LeagueDataContext = createContext<LeagueDataContextProps>({
  leaguesData: initialLeaguesData,
  categories: LEAGUE_CATEGORIES,
  loading: true,
  error: null,
  refetch: () => {},
});

export const LeagueDataProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const [leaguesData, setLeaguesData] =
    useState<LeaguesData>(initialLeaguesData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const processFileWithTimeout = async (
    config: {
      title: string;
      fileName: string;
      categoryId: string;
      categoryName: string;
    },
    dataPath: string,
    timeoutMs = 10000,
  ): Promise<League> => {
    return await Promise.race([
      processLeagueZip(config, dataPath),
      new Promise<League>((_, reject) => {
        return setTimeout(() => {
          reject(new Error(`Timeout processing file ${config.fileName}`));
        }, timeoutMs);
      }),
    ]);
  };

  const loadLeagueData = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Process all categories in parallel
      const results = await Promise.allSettled(
        LEAGUE_CATEGORIES.map(async (category) => {
          const dataPath = getLeagueDataPath(category.id);

          // Process all leagues in this category
          const leagueResults = await Promise.allSettled(
            category.leagues.map((league) =>
              processFileWithTimeout(
                {
                  title: league.title,
                  fileName: league.fileName,
                  categoryId: category.id,
                  categoryName: category.name,
                },
                dataPath,
              ),
            ),
          );

          // Filter successful results
          const successfulLeagues = leagueResults
            .filter(
              (result): result is PromiseFulfilledResult<League> =>
                result.status === 'fulfilled',
            )
            .map((result) => result.value);

          // Log any failures
          leagueResults.forEach((result, index) => {
            if (result.status === 'rejected') {
              logger.warn(
                `Failed to load ${category.leagues[index]?.title}: ${result.reason}`,
              );
            }
          });

          return {
            categoryId: category.id,
            leagues: successfulLeagues,
          };
        }),
      );

      // Build the new leagues data object
      const newLeaguesData: LeaguesData = {};

      results.forEach((result, index) => {
        const category = LEAGUE_CATEGORIES[index];
        if (!category) return;

        if (result.status === 'fulfilled') {
          newLeaguesData[category.id] =
            result.value.leagues.length > 0 ? result.value.leagues : null;
        } else {
          logger.error(
            `Failed to load category ${category.name}:`,
            result.reason,
          );
          newLeaguesData[category.id] = null;
        }
      });

      setLeaguesData(newLeaguesData);

      // Check if any data was loaded
      const hasAnyData = Object.values(newLeaguesData).some(
        (leagues) => leagues && leagues.length > 0,
      );

      if (!hasAnyData) {
        setError(
          'No league data found. Please add ZIP files to the public/data/ directory.',
        );
      }
    } catch (err) {
      logger.error('Error loading league data:', err);
      setError(
        `Failed to load league data. Please try again later. ${String(err)}`,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeagueData().catch((err) => {
      logger.error('Error in loadLeagueData effect:', err);
      setError(`Failed to load league data: ${String(err)}`);
    });
  }, [loadLeagueData]);

  const handleRefetch = useCallback(() => {
    loadLeagueData().catch((err) => {
      logger.error('Error refetching league data:', err);
      setError(`Failed to refetch league data: ${String(err)}`);
    });
  }, [loadLeagueData]);

  const contextValue = useMemo(
    () => ({
      leaguesData,
      categories: LEAGUE_CATEGORIES,
      loading,
      error,
      refetch: handleRefetch,
    }),
    [leaguesData, loading, error, handleRefetch],
  );

  return (
    <LeagueDataContext.Provider value={contextValue}>
      {children}
    </LeagueDataContext.Provider>
  );
};
