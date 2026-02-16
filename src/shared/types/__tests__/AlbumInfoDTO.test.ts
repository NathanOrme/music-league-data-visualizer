import type { AlbumInfoDTO } from '@/shared/types/AlbumInfoDTO';

describe('AlbumInfoDTO', () => {
  it('should create a valid AlbumInfoDTO object with required properties', () => {
    const album: AlbumInfoDTO = {
      albumName: 'Test Album',
      albumArtist: 'Test Artist',
      albumYear: 2020,
      played: false,
    };

    expect(album.albumName).toBe('Test Album');
    expect(album.albumArtist).toBe('Test Artist');
    expect(album.albumYear).toBe(2020);
    expect(album.played).toBe(false);
  });

  it('should allow optional properties', () => {
    const album: AlbumInfoDTO = {
      id: 1,
      albumName: 'Test Album',
      albumArtist: 'Test Artist',
      albumYear: 2021,
      played: true,
      albumArtUrl: 'http://example.com/art.jpg',
      wikipediaUrl: 'https://en.wikipedia.org',
      genres: ['rock', 'pop'],
    };

    expect(album.id).toBe(1);
    expect(album.albumArtUrl).toContain('http');
    expect(album.wikipediaUrl).toMatch(/wikipedia/);
    expect(Array.isArray(album.genres)).toBe(true);
  });

  it('should allow wikipediaUrl to be null', () => {
    const album: AlbumInfoDTO = {
      albumName: 'Nullable Wikipedia',
      albumArtist: 'Test Artist',
      albumYear: 2000,
      played: false,
      wikipediaUrl: null,
    };

    expect(album.wikipediaUrl).toBeNull();
  });
});
