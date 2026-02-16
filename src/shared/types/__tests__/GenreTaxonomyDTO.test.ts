/**
 * @file GenreTaxonomyDTO.test.ts
 * @description Tests for GenreTaxonomyDTO type
 */

import { describe, expect, it } from '@jest/globals';
import type { GenreTaxonomyDTO } from '../GenreTaxonomyDTO';

describe('GenreTaxonomyDTO', () => {
  it('should accept valid taxonomy with genres and subGenres', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Rock', 'Pop', 'Jazz'],
      subGenres: {
        Rock: ['Alternative Rock', 'Hard Rock', 'Progressive Rock'],
        Pop: ['Synth Pop', 'Indie Pop'],
        Jazz: ['Bebop', 'Fusion', 'Free Jazz'],
      },
    };

    expect(taxonomy.genres).toHaveLength(3);
    expect(taxonomy.subGenres.Rock).toHaveLength(3);
    expect(taxonomy.subGenres.Pop).toHaveLength(2);
    expect(taxonomy.subGenres.Jazz).toHaveLength(3);
  });

  it('should accept empty genres array', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: [],
      subGenres: {},
    };

    expect(taxonomy.genres).toHaveLength(0);
    expect(Object.keys(taxonomy.subGenres)).toHaveLength(0);
  });

  it('should accept genres without subGenres', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Classical', 'Electronic'],
      subGenres: {},
    };

    expect(taxonomy.genres).toHaveLength(2);
    expect(taxonomy.subGenres).toEqual({});
  });

  it('should accept subGenres without corresponding genres', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Rock'],
      subGenres: {
        Rock: ['Alternative Rock'],
        Metal: ['Heavy Metal', 'Death Metal'], // Metal not in genres
      },
    };

    expect(taxonomy.genres).toHaveLength(1);
    expect(Object.keys(taxonomy.subGenres)).toHaveLength(2);
  });

  it('should handle single genre with multiple subGenres', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Hip Hop'],
      subGenres: {
        'Hip Hop': [
          'Trap',
          'Conscious Hip Hop',
          'Old School Hip Hop',
          'Alternative Hip Hop',
        ],
      },
    };

    expect(taxonomy.genres).toHaveLength(1);
    expect(taxonomy.subGenres['Hip Hop']).toHaveLength(4);
  });

  it('should handle multiple genres with no subGenres', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Folk', 'Country', 'Blues', 'Reggae'],
      subGenres: {},
    };

    expect(taxonomy.genres).toHaveLength(4);
    expect(taxonomy.genres).toContain('Folk');
    expect(taxonomy.genres).toContain('Country');
    expect(taxonomy.genres).toContain('Blues');
    expect(taxonomy.genres).toContain('Reggae');
  });

  it('should handle genres with empty subGenre arrays', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Rock', 'Pop'],
      subGenres: {
        Rock: [],
        Pop: [],
      },
    };

    expect(taxonomy.subGenres.Rock).toHaveLength(0);
    expect(taxonomy.subGenres.Pop).toHaveLength(0);
  });

  it('should handle complex nested taxonomy', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Electronic', 'Rock', 'Jazz', 'Classical'],
      subGenres: {
        Electronic: [
          'House',
          'Techno',
          'Drum and Bass',
          'Ambient',
          'Dubstep',
        ],
        Rock: ['Alternative', 'Indie', 'Punk', 'Progressive'],
        Jazz: ['Bebop', 'Smooth Jazz', 'Jazz Fusion'],
        Classical: ['Baroque', 'Romantic', 'Contemporary Classical'],
      },
    };

    expect(taxonomy.genres).toHaveLength(4);
    expect(taxonomy.subGenres.Electronic).toHaveLength(5);
    expect(taxonomy.subGenres.Rock).toHaveLength(4);
    expect(taxonomy.subGenres.Jazz).toHaveLength(3);
    expect(taxonomy.subGenres.Classical).toHaveLength(3);
  });

  it('should handle special characters in genre names', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['R&B', 'K-Pop', "90's Rock"],
      subGenres: {
        'R&B': ['Contemporary R&B', 'Neo-Soul'],
        'K-Pop': ['K-Pop Girl Groups', 'K-Pop Boy Bands'],
        "90's Rock": ['Grunge', 'Britpop'],
      },
    };

    expect(taxonomy.genres).toContain('R&B');
    expect(taxonomy.genres).toContain('K-Pop');
    expect(taxonomy.genres).toContain("90's Rock");
    expect(taxonomy.subGenres['R&B']).toBeDefined();
  });

  it('should handle long genre and subGenre names', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['Progressive Death Metal'],
      subGenres: {
        'Progressive Death Metal': [
          'Technical Progressive Death Metal',
          'Melodic Progressive Death Metal',
        ],
      },
    };

    expect(taxonomy.genres[0]).toBe('Progressive Death Metal');
    expect(taxonomy.subGenres['Progressive Death Metal'][0]).toBe(
      'Technical Progressive Death Metal',
    );
  });

  it('should maintain insertion order for arrays', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['First', 'Second', 'Third', 'Fourth'],
      subGenres: {
        First: ['Sub1', 'Sub2'],
      },
    };

    expect(taxonomy.genres[0]).toBe('First');
    expect(taxonomy.genres[1]).toBe('Second');
    expect(taxonomy.genres[2]).toBe('Third');
    expect(taxonomy.genres[3]).toBe('Fourth');
  });

  it('should handle numeric-like genre names', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['80s Pop', '90s Hip Hop', '2000s Indie'],
      subGenres: {
        '80s Pop': ['Synth Pop', 'New Wave'],
        '90s Hip Hop': ['Golden Age Hip Hop'],
        '2000s Indie': ['Indie Rock', 'Indie Pop'],
      },
    };

    expect(taxonomy.genres).toContain('80s Pop');
    expect(taxonomy.subGenres['80s Pop']).toBeDefined();
  });

  it('should handle case-sensitive genre names', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['rock', 'Rock', 'ROCK'],
      subGenres: {
        rock: ['lowercase rock'],
        Rock: ['Title case Rock'],
        ROCK: ['UPPERCASE ROCK'],
      },
    };

    expect(taxonomy.genres).toHaveLength(3);
    expect(taxonomy.subGenres['rock']).toBeDefined();
    expect(taxonomy.subGenres['Rock']).toBeDefined();
    expect(taxonomy.subGenres['ROCK']).toBeDefined();
  });

  it('should handle whitespace in genre names', () => {
    const taxonomy: GenreTaxonomyDTO = {
      genres: ['  Padded  ', 'Normal'],
      subGenres: {
        '  Padded  ': ['Sub with spaces'],
      },
    };

    expect(taxonomy.genres).toContain('  Padded  ');
    expect(taxonomy.subGenres['  Padded  ']).toBeDefined();
  });
});
