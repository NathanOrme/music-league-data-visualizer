import { LeagueTypes } from '@/shared/types/leagueTypes';

describe('LeagueTypes', () => {
  it('should have NormalLeagues with value "1001"', () => {
    expect(LeagueTypes.NormalLeagues).toBe('1001');
  });

  it('should have WordsLeagues with value "Words"', () => {
    expect(LeagueTypes.WordsLeagues).toBe('Words');
  });
});
