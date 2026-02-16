import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { League, Standing } from '@/shared/utils/dataProcessing';
import { LeagueAccordionCard } from '../LeagueAccordionCard';

const baseLeague: League = {
  title: 'Test League',
  rounds: [],
  leagueStandings: [
    { position: 1, name: 'Alice', points: 100 },
    { position: 2, name: 'Bob', points: 90 },
    { position: 3, name: 'Charlie', points: 80 },
  ],
};

describe('LeagueAccordionCard', () => {
  it('renders standings using lowercase name/points fields', () => {
    render(<LeagueAccordionCard league={baseLeague} isOpen />);

    expect(screen.getByText('Top Performers')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('100 points')).toBeInTheDocument();
  });

  it('supports legacy Name/Score standing fields', () => {
    const legacyStanding = {
      position: 1,
      Name: 'Legacy Winner',
      Score: 42,
    } as unknown as Standing;

    const legacyLeague: League = {
      ...baseLeague,
      leagueStandings: [legacyStanding],
    };

    render(<LeagueAccordionCard league={legacyLeague} isOpen />);

    expect(screen.getByText('Legacy Winner')).toBeInTheDocument();
    expect(screen.getByText('42 points')).toBeInTheDocument();
  });
});
