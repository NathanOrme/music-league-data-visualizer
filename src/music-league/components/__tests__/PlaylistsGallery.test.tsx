import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { League, Round } from '@/shared/utils/dataProcessing';
import { PlaylistsGallery } from '../PlaylistsGallery';

const baseRound: Round = {
  id: 'r-1',
  created: '2024-01-01',
  name: 'Round One',
  description: 'First round playlist',
  playlist: 'https://open.spotify.com/playlist/12345',
  standings: [],
};

const baseLeague: League = {
  title: 'Test League',
  rounds: [baseRound],
  leagueStandings: [],
};

describe('PlaylistsGallery', () => {
  it('renders round playlists from league data-processing shape', () => {
    render(<PlaylistsGallery leagues={[baseLeague]} />);

    expect(
      screen.queryByText(/No Playlists Available/i),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText('Round One')[0]).toBeInTheDocument();
    expect(
      screen.getByLabelText('Open Round One in Spotify'),
    ).toHaveAttribute(
      'href',
      'https://open.spotify.com/playlist/12345',
    );
  });

  it('falls back to legacy round playlist fields when present', () => {
    const legacyRound = {
      ...baseRound,
      name: '',
      playlist: undefined,
      roundName: 'Legacy Round',
      spotifyPlaylistUrl:
        'https://open.spotify.com/playlist/legacy123',
    } as Round & {
      roundName?: string;
      spotifyPlaylistUrl?: string;
    };

    const legacyLeague: League = {
      ...baseLeague,
      title: 'Legacy League',
      rounds: [legacyRound],
    };

    render(<PlaylistsGallery leagues={[legacyLeague]} />);

    expect(
      screen.getAllByText('Legacy Round')[0],
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Open Legacy Round in Spotify'),
    ).toHaveAttribute(
      'href',
      'https://open.spotify.com/playlist/legacy123',
    );
  });
});
