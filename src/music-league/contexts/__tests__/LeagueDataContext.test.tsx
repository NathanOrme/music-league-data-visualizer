import {
  LeagueDataContext,
  LeagueDataProvider,
} from '@/music-league/contexts/LeagueDataContext';
import { LeagueTypes } from '@/shared/types/leagueTypes';
import { processLeagueZip } from '@/shared/utils/dataProcessing';
import { act, render, screen, waitFor } from '@testing-library/react';

import { useContext } from 'react';

// Mock the dataProcessing module
jest.mock('@/shared/utils/dataProcessing', () => ({
  leagueFiles: [
    {
      fileName: '1001LeaguesUnderTheSea.zip',
      leagueTitle: '1001 Leagues Under The Sea',
    },
  ],
  wordsLeagueFiles: [
    { fileName: '1001Words.zip', leagueTitle: 'Words League' },
  ],
  processLeagueZip: jest.fn(),
}));

// Mock data for testing
const mockLeague = {
  title: 'Test League',
  rounds: [
    {
      id: '1',
      created: '2023-01-01',
      name: 'Round 1',
      description: 'Test round',
      standings: [
        { position: 1, name: 'User 1', points: 10, song: 'Song 1' },
      ],
    },
  ],
  leagueStandings: [
    { position: 1, name: 'User 1', points: 10, song: 'Song 1' },
  ],
};

// Test component to access context
const TestComponent = () => {
  const { leaguesData, loading, error, refetch } =
    useContext(LeagueDataContext);

  return (
    <div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="error">{error || 'no error'}</div>
      <div data-testid="normal-leagues">
        {leaguesData[LeagueTypes.NormalLeagues]
          ? 'loaded'
          : 'not loaded'}
      </div>
      <div data-testid="words-leagues">
        {leaguesData[LeagueTypes.WordsLeagues]
          ? 'loaded'
          : 'not loaded'}
      </div>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

describe('LeagueDataContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the processLeagueZip function to return a successful result
    (processLeagueZip as jest.Mock).mockResolvedValue(mockLeague);
  });

  it('should render children and provide context', async () => {
    render(
      <LeagueDataProvider>
        <TestComponent />
      </LeagueDataProvider>,
    );

    // Initially should be loading
    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    expect(screen.getByTestId('error')).toHaveTextContent('no error');

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent(
        'false',
      );
    });

    // Check that all league types are loaded
    expect(screen.getByTestId('normal-leagues')).toHaveTextContent(
      'loaded',
    );
    expect(screen.getByTestId('words-leagues')).toHaveTextContent(
      'loaded',
    );
  });

  it('should handle errors when loading data', async () => {
    // Mock processLeagueZip to throw an error
    (processLeagueZip as jest.Mock).mockRejectedValue(
      new Error('Failed to load'),
    );

    render(
      <LeagueDataProvider>
        <TestComponent />
      </LeagueDataProvider>,
    );

    // Wait for error to be set
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Failed to load league data. Please try again later.',
      );
    });
  });

  it('should allow refetching data', async () => {
    render(
      <LeagueDataProvider>
        <TestComponent />
      </LeagueDataProvider>,
    );

    // Wait for initial load to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent(
        'false',
      );
    });

    // Mock processLeagueZip to return different data
    const newMockLeague = { ...mockLeague, title: 'New League' };
    (processLeagueZip as jest.Mock).mockResolvedValue(newMockLeague);

    // Click refetch button
    act(() => {
      screen.getByText('Refetch').click();
    });

    // Should be loading again
    expect(screen.getByTestId('loading')).toHaveTextContent('true');

    // Wait for refetch to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent(
        'false',
      );
    });

    // Verify processLeagueZip was called again
    expect(processLeagueZip).toHaveBeenCalled();
  });

  it('should handle timeout when processing files', async () => {
    // Mock processLeagueZip to reject with a timeout error
    (processLeagueZip as jest.Mock).mockRejectedValue(
      new Error('Timeout processing file 1001LeaguesUnderTheSea.zip'),
    );

    render(
      <LeagueDataProvider>
        <TestComponent />
      </LeagueDataProvider>,
    );

    // Wait for error to be set
    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Failed to load league data. Please try again later.',
      );
    });
  });
});
