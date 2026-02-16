import type { GenreCountDTO } from '@/shared/types/GenreCountDTO';

describe('GenreCountDTO', () => {
  it('should create a valid GenreCountDTO object', () => {
    const dto: GenreCountDTO = {
      genre: 'Jazz',
      count: 5,
    };

    expect(dto.genre).toBe('Jazz');
    expect(dto.count).toBe(5);
  });

  it('should allow different genres and counts', () => {
    const dto: GenreCountDTO = {
      genre: 'Rock',
      count: 10,
    };

    expect(typeof dto.genre).toBe('string');
    expect(typeof dto.count).toBe('number');
  });
});
