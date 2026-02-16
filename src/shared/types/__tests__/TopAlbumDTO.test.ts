import type { TopAlbumDTO } from '../TopAlbumDTO';

describe('TopAlbumDTO', () => {
  it('should define the correct interface structure', () => {
    // Create a valid TopAlbumDTO object
    const validTopAlbum: TopAlbumDTO = {
      albumName: 'Test Album',
      albumArtist: 'Test Artist',
      albumYear: 2023,
      albumGenre: 'Rock',
      ownerCount: 5,
      rank: 1,
    };

    // Test that all required properties are present
    expect(validTopAlbum.albumName).toBe('Test Album');
    expect(validTopAlbum.albumArtist).toBe('Test Artist');
    expect(validTopAlbum.albumYear).toBe(2023);
    expect(validTopAlbum.albumGenre).toBe('Rock');
    expect(validTopAlbum.ownerCount).toBe(5);
    expect(validTopAlbum.rank).toBe(1);
  });

  it('should allow all string properties', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Abbey Road',
      albumArtist: 'The Beatles',
      albumYear: 1969,
      albumGenre: 'Rock/Pop',
      ownerCount: 150,
      rank: 1,
    };

    expect(typeof topAlbum.albumName).toBe('string');
    expect(typeof topAlbum.albumArtist).toBe('string');
    expect(typeof topAlbum.albumGenre).toBe('string');
  });

  it('should allow all number properties', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Dark Side of the Moon',
      albumArtist: 'Pink Floyd',
      albumYear: 1973,
      albumGenre: 'Progressive Rock',
      ownerCount: 200,
      rank: 2,
    };

    expect(typeof topAlbum.albumYear).toBe('number');
    expect(typeof topAlbum.ownerCount).toBe('number');
    expect(typeof topAlbum.rank).toBe('number');
  });

  it('should handle edge cases for numeric properties', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Test Album',
      albumArtist: 'Test Artist',
      albumYear: 0, // Edge case: year 0
      albumGenre: 'Test Genre',
      ownerCount: 0, // Edge case: no owners
      rank: 1,
    };

    expect(topAlbum.albumYear).toBe(0);
    expect(topAlbum.ownerCount).toBe(0);
    expect(topAlbum.rank).toBe(1);
  });

  it('should handle large numbers', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Popular Album',
      albumArtist: 'Popular Artist',
      albumYear: 2024,
      albumGenre: 'Pop',
      ownerCount: 999999, // Large owner count
      rank: 1000, // High rank
    };

    expect(topAlbum.ownerCount).toBe(999999);
    expect(topAlbum.rank).toBe(1000);
  });

  it('should handle special characters in string properties', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Album with "Quotes" & Symbols!',
      albumArtist: 'Artist with Ümlauts & Açcents',
      albumYear: 2023,
      albumGenre: 'Rock/Pop & Electronic',
      ownerCount: 10,
      rank: 5,
    };

    expect(topAlbum.albumName).toContain('"Quotes"');
    expect(topAlbum.albumName).toContain('&');
    expect(topAlbum.albumName).toContain('!');
    expect(topAlbum.albumArtist).toContain('Ümlauts');
    expect(topAlbum.albumArtist).toContain('Açcents');
    expect(topAlbum.albumGenre).toContain('/');
    expect(topAlbum.albumGenre).toContain('&');
  });

  it('should handle empty strings', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: '',
      albumArtist: '',
      albumYear: 2023,
      albumGenre: '',
      ownerCount: 1,
      rank: 1,
    };

    expect(topAlbum.albumName).toBe('');
    expect(topAlbum.albumArtist).toBe('');
    expect(topAlbum.albumGenre).toBe('');
  });

  it('should handle very long strings', () => {
    const longString = 'A'.repeat(1000);
    const topAlbum: TopAlbumDTO = {
      albumName: longString,
      albumArtist: longString,
      albumYear: 2023,
      albumGenre: longString,
      ownerCount: 1,
      rank: 1,
    };

    expect(topAlbum.albumName.length).toBe(1000);
    expect(topAlbum.albumArtist.length).toBe(1000);
    expect(topAlbum.albumGenre.length).toBe(1000);
  });

  it('should handle negative numbers for edge cases', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Test Album',
      albumArtist: 'Test Artist',
      albumYear: -1, // Negative year (edge case)
      albumGenre: 'Test',
      ownerCount: -1, // Negative owner count (edge case)
      rank: -1, // Negative rank (edge case)
    };

    expect(topAlbum.albumYear).toBe(-1);
    expect(topAlbum.ownerCount).toBe(-1);
    expect(topAlbum.rank).toBe(-1);
  });

  it('should be assignable to object with same structure', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Test',
      albumArtist: 'Test',
      albumYear: 2023,
      albumGenre: 'Test',
      ownerCount: 1,
      rank: 1,
    };

    const copy: TopAlbumDTO = { ...topAlbum };

    expect(copy).toEqual(topAlbum);
    expect(copy).not.toBe(topAlbum); // Different object references
  });

  it('should work with arrays of TopAlbumDTO', () => {
    const topAlbums: TopAlbumDTO[] = [
      {
        albumName: 'Album 1',
        albumArtist: 'Artist 1',
        albumYear: 2021,
        albumGenre: 'Rock',
        ownerCount: 10,
        rank: 1,
      },
      {
        albumName: 'Album 2',
        albumArtist: 'Artist 2',
        albumYear: 2022,
        albumGenre: 'Pop',
        ownerCount: 8,
        rank: 2,
      },
    ];

    expect(topAlbums).toHaveLength(2);
    expect(topAlbums[0].albumName).toBe('Album 1');
    expect(topAlbums[1].albumName).toBe('Album 2');
    expect(topAlbums[0].rank).toBe(1);
    expect(topAlbums[1].rank).toBe(2);
  });

  it('should maintain type safety', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Type Safe Album',
      albumArtist: 'Type Safe Artist',
      albumYear: 2023,
      albumGenre: 'Electronic',
      ownerCount: 25,
      rank: 10,
    };

    // These should all be properly typed
    expect(topAlbum.albumName.toLowerCase()).toBe('type safe album');
    expect(topAlbum.albumYear.toString()).toBe('2023');
    expect(topAlbum.ownerCount + 5).toBe(30);
    expect(topAlbum.rank * 2).toBe(20);
  });

  it('should handle decimal numbers appropriately', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'Decimal Test',
      albumArtist: 'Decimal Artist',
      albumYear: 2023.5, // Decimal year (unusual but allowed)
      albumGenre: 'Test',
      ownerCount: 10.7, // Decimal owner count (unusual but allowed)
      rank: 5.3, // Decimal rank (unusual but allowed)
    };

    expect(topAlbum.albumYear).toBe(2023.5);
    expect(topAlbum.ownerCount).toBe(10.7);
    expect(topAlbum.rank).toBe(5.3);
  });

  it('should be compatible with JSON serialization', () => {
    const topAlbum: TopAlbumDTO = {
      albumName: 'JSON Test Album',
      albumArtist: 'JSON Artist',
      albumYear: 2023,
      albumGenre: 'JSON Genre',
      ownerCount: 15,
      rank: 3,
    };

    const jsonString = JSON.stringify(topAlbum);
    const parsed: TopAlbumDTO = JSON.parse(jsonString);

    expect(parsed).toEqual(topAlbum);
    expect(parsed.albumName).toBe('JSON Test Album');
    expect(parsed.ownerCount).toBe(15);
  });
});
