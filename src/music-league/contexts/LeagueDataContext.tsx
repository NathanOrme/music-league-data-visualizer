import { LeagueTypes } from '@/shared/types/leagueTypes';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  League,
  LeagueFileInfo,
} from '@/shared/utils/dataProcessing';
import {
  coffeeLeagueFiles,
  headOfSteamLeagueFiles,
  leagueFiles,
  processLeagueZip,
  wordsLeagueFiles,
} from '@/shared/utils/dataProcessing';
import { logger } from '@/shared/utils/logger';
import type { FC, JSX, ReactNode } from 'react';

/**
 * Type representing the data structure for leagues.
 */
export type LeaguesData = {
  [key in LeagueTypes]: League[] | null;
};

/**
 * Props for the LeagueDataContext.
 */
interface LeagueDataContextProps {
  leaguesData: LeaguesData;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * LeagueDataContext is a React context that provides league data to its children components.
 */
export const LeagueDataContext =
  createContext<LeagueDataContextProps>({
    leaguesData: {
      [LeagueTypes.NormalLeagues]: null,
      [LeagueTypes.WordsLeagues]: null,
      [LeagueTypes.CoffeeLeagues]: null,
      [LeagueTypes.HOSLeagues]: null,
    },
    loading: true,
    error: null,
    refetch: () => {
      // empty because refetch is intentionally left empty as no re-fetch operation is required
    },
  });

/**
 * Configuration for league files and paths.
 */
const leagueConfigs: {
  [key in LeagueTypes]: { files: LeagueFileInfo[]; path: string };
} = {
  [LeagueTypes.NormalLeagues]: {
    files: leagueFiles,
    path: '/league-zip',
  },
  [LeagueTypes.WordsLeagues]: {
    files: wordsLeagueFiles,
    path: '/words-zip',
  },
  [LeagueTypes.CoffeeLeagues]: {
    files: coffeeLeagueFiles,
    path: '/coffee-zip',
  },
  [LeagueTypes.HOSLeagues]: {
    files: headOfSteamLeagueFiles,
    path: '/hos-zip',
  },
};

/**
 * LeagueDataProvider is a React functional component that provides league data
 * to its children components using the LeagueDataContext.
 *
 * @component
 * @example
 * return (
 *  <LeagueDataProvider>
 *    <YourComponent />
 *  </LeagueDataProvider>
 * )
 * @returns {JSX.Element} The rendered component.
 */
export const LeagueDataProvider: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const [leaguesData, setLeaguesData] = useState<LeaguesData>({
    [LeagueTypes.NormalLeagues]: null,
    [LeagueTypes.WordsLeagues]: null,
    [LeagueTypes.CoffeeLeagues]: null,
    [LeagueTypes.HOSLeagues]: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Processes a single league file with a timeout mechanism
   * @param file League file to process
   * @param path Path to the league file
   * @param timeoutMs Timeout duration in milliseconds
   * @returns Processed league data
   */
  const processFileWithTimeout = async (
    file: LeagueFileInfo,
    path: string,
    timeoutMs = 5000,
  ): Promise<League> => {
    return await Promise.race([
      processLeagueZip(file, path),
      new Promise<League>((_, reject) => {
        return setTimeout(() => {
          reject(
            new Error(`Timeout processing file ${file.fileName}`),
          );
        }, timeoutMs);
      }),
    ]);
  };

  /**
   * Loads league data from configured sources
   * @returns Promise resolving when league data is loaded
   */
  const loadLeagueData = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // Process leagues in parallel
      const processedLeagues = await Promise.all(
        Object.entries(leagueConfigs).map(
          async ([leagueType, { files, path }]) => {
            const processedFiles = await Promise.all(
              files.map((file) =>
                processFileWithTimeout(file, path, 5000),
              ),
            );
            return { leagueType, data: processedFiles };
          },
        ),
      );

      // Convert processed leagues to LeaguesData
      const newLeaguesData = processedLeagues.reduce(
        (acc, { leagueType, data }) => {
          acc[leagueType as LeagueTypes] = data;
          return acc;
        },
        {} as LeaguesData,
      );

      setLeaguesData(newLeaguesData);
    } catch (err) {
      setError(
        `Failed to load league data. Please try again later. ${String(err)}`,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeagueData().catch((err) => {
      logger.error('Error loading league data:', err);
      setError(
        `Failed to load league data. Please try again later. ${err}`,
      );
    });
  }, [loadLeagueData]);

  /**
   * Refetches league data
   * @returns Promise resolving when league data is refetched
   */
  const handleRefetch = useCallback(() => {
    loadLeagueData().catch((err) => {
      logger.error('Error refetching league data:', err);
      setError(
        `Failed to refetch league data. Please try again later. ${err}`,
      );
    });
  }, [loadLeagueData]);

  /**
   * Context value for league data
   */
  const contextValue = useMemo(
    () => ({
      leaguesData,
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
