import type { League, Standing } from '@/shared/utils/dataProcessing';
import { getParticipantCount } from '../SimpleMusicLeaguePage';

const makeLeague = (standings: Standing[]): League => ({
  title: 'League',
  rounds: [],
  leagueStandings: standings,
});

describe('SimpleMusicLeaguePage helpers', () => {
  it('counts participants using lowercase fields', () => {
    const leagues: League[] = [
      makeLeague([
        { position: 1, name: 'Alice', points: 10 },
        { position: 2, name: 'Bob', points: 8 },
      ]),
      makeLeague([{ position: 1, name: 'Alice', points: 12 }]),
    ];

    expect(getParticipantCount(leagues)).toBe(2);
  });

  it('counts participants when standings use legacy Name field', () => {
    const legacyStanding = {
      position: 1,
      Name: 'Legacy User',
      points: 5,
    } as unknown as Standing;

    const leagues: League[] = [
      makeLeague([legacyStanding]),
      makeLeague([{ position: 1, name: 'Legacy User', points: 7 }]),
    ];

    expect(getParticipantCount(leagues)).toBe(1);
  });
});
