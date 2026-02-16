import type { AlbumInfoDTO } from '@/shared/types/AlbumInfoDTO';
import type { EventDTO } from '@/shared/types/EventDTO';
import type {
  Competitor,
  League,
  Round,
  Standing,
  Submission,
  Vote,
} from '@/shared/utils/dataProcessing';

/**
 * Mock album data for testing purposes
 */
export const mockAlbum: AlbumInfoDTO = {
  id: 1,
  albumName: 'Test Album',
  albumArtist: 'Test Artist',
  albumYear: 2025,
  played: false,
  genres: ['Rock'],
  albumArtUrl: 'http://example.com/cover.jpg',
  wikipediaUrl: 'http://wikipedia.org/test_album',
};

/**
 * Mock event data for testing purposes
 */
export const mockEvent: EventDTO = {
  id: 1,
  eventDate: '2025-07-14',
  eventTheme: 'Original Theme',
  eventNotes: 'Original Notes',
  albums: [],
};

/**
 * Mock Music League data for testing purposes
 */

export const mockCompetitors: Competitor[] = [
  { ID: 'user1', Name: 'Alice Johnson' },
  { ID: 'user2', Name: 'Bob Smith' },
  { ID: 'user3', Name: 'Charlie Davis' },
  { ID: 'user4', Name: 'Diana Wilson' },
  { ID: 'user5', Name: 'Eve Martinez' },
];

export const mockSubmissions: Submission[] = [
  {
    'Spotify URI': 'spotify:track:abc123',
    Title: 'Summer Breeze',
    Album: 'Summer Hits',
    'Artist(s)': 'The Sunshine Band',
    'Submitter ID': 'user1',
    Created: '2024-01-01T10:00:00Z',
    Comment: 'Perfect summer vibe!',
    'Round ID': 'round1',
    'Visible To Voters': 'true',
  },
  {
    'Spotify URI': 'spotify:track:def456',
    Title: 'Ocean Waves',
    Album: 'Beach Paradise',
    'Artist(s)': 'Coastal Sounds',
    'Submitter ID': 'user2',
    Created: '2024-01-01T11:00:00Z',
    Comment: 'Relaxing beach sounds',
    'Round ID': 'round1',
    'Visible To Voters': 'true',
  },
  {
    'Spotify URI': 'spotify:track:ghi789',
    Title: 'Winter Wonderland',
    Album: 'Snowy Days',
    'Artist(s)': 'Ice Crystals',
    'Submitter ID': 'user3',
    Created: '2024-02-01T10:00:00Z',
    Comment: 'Magical winter feeling',
    'Round ID': 'round2',
    'Visible To Voters': 'true',
  },
];

export const mockVotes: Vote[] = [
  {
    'Spotify URI': 'spotify:track:abc123',
    'Voter ID': 'user2',
    Created: '2024-01-05T10:00:00Z',
    'Points Assigned': '10',
    Comment: 'Love it!',
    'Round ID': 'round1',
  },
  {
    'Spotify URI': 'spotify:track:def456',
    'Voter ID': 'user1',
    Created: '2024-01-05T11:00:00Z',
    'Points Assigned': '8',
    Comment: 'Great choice',
    'Round ID': 'round1',
  },
  {
    'Spotify URI': 'spotify:track:ghi789',
    'Voter ID': 'user4',
    Created: '2024-02-05T10:00:00Z',
    'Points Assigned': '9',
    Comment: 'Beautiful',
    'Round ID': 'round2',
  },
];

export const mockStandings: Standing[] = [
  {
    position: 1,
    name: 'Alice Johnson',
    points: 150,
    song: 'Summer Breeze',
  },
  {
    position: 2,
    name: 'Bob Smith',
    points: 142,
    song: 'Ocean Waves',
  },
  {
    position: 3,
    name: 'Charlie Davis',
    points: 138,
    song: 'Winter Wonderland',
  },
  {
    position: 4,
    name: 'Diana Wilson',
    points: 125,
    song: 'Autumn Leaves',
  },
  {
    position: 5,
    name: 'Eve Martinez',
    points: 118,
    song: 'Spring Rain',
  },
];

export const mockRounds: Round[] = [
  {
    id: 'round1',
    created: '2024-01-01T00:00:00Z',
    name: 'Summer Vibes',
    description: 'Songs that capture the essence of summer',
    playlist: 'https://open.spotify.com/playlist/summer123',
    standings: [
      {
        position: 1,
        name: 'Alice Johnson',
        points: 28,
        song: 'Summer Breeze',
      },
      {
        position: 2,
        name: 'Bob Smith',
        points: 25,
        song: 'Ocean Waves',
      },
      {
        position: 3,
        name: 'Charlie Davis',
        points: 22,
        song: 'Sunny Day',
      },
    ],
  },
  {
    id: 'round2',
    created: '2024-02-01T00:00:00Z',
    name: 'Winter Nights',
    description: 'Cozy tracks for cold evenings',
    playlist: 'https://open.spotify.com/playlist/winter456',
    standings: [
      {
        position: 1,
        name: 'Charlie Davis',
        points: 30,
        song: 'Winter Wonderland',
      },
      {
        position: 2,
        name: 'Diana Wilson',
        points: 27,
        song: 'Snowflakes',
      },
      {
        position: 3,
        name: 'Eve Martinez',
        points: 24,
        song: 'Fireplace',
      },
    ],
  },
  {
    id: 'round3',
    created: '2024-03-01T00:00:00Z',
    name: 'Spring Awakening',
    description: 'Fresh sounds for a new season',
    standings: [
      {
        position: 1,
        name: 'Bob Smith',
        points: 26,
        song: 'Blossom',
      },
      {
        position: 2,
        name: 'Alice Johnson',
        points: 25,
        song: 'Rain Dance',
      },
      {
        position: 3,
        name: 'Eve Martinez',
        points: 23,
        song: 'Spring Rain',
      },
    ],
  },
];

export const mockLeague: League = {
  title: 'Test Music League 2024',
  rounds: mockRounds,
  leagueStandings: mockStandings,
  votes: mockVotes,
  competitors: mockCompetitors,
  submissions: mockSubmissions,
  urls: {
    mainPlaylist: 'https://open.spotify.com/playlist/mainLeague2024',
    homepage: 'https://musicleague.example.com',
    social: {
      twitter: 'https://twitter.com/musicleague',
      instagram: 'https://instagram.com/musicleague',
      discord: 'https://discord.gg/musicleague',
    },
    archive: 'https://musicleague.example.com/archive',
    rules: 'https://musicleague.example.com/rules',
    leaderboard: 'https://musicleague.example.com/leaderboard',
  },
};

export const mockEmptyLeague: League = {
  title: 'Empty League',
  rounds: [],
  leagueStandings: [],
  votes: [],
  competitors: [],
  submissions: [],
};

export const mockLeagueWithoutStandings: League = {
  title: 'League Without Standings',
  rounds: mockRounds,
  leagueStandings: [],
  votes: mockVotes,
  competitors: mockCompetitors,
  submissions: mockSubmissions,
};
