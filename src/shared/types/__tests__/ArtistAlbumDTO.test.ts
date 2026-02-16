import type { AlbumInfoDTO } from '../AlbumInfoDTO';
import type { ArtistAlbumDTO } from '../ArtistAlbumDTO';

describe('ArtistAlbumDTO', () => {
  it('should create a valid ArtistAlbumDTO object', () => {
    // Create a dummy AlbumInfoDTO. Adjust its properties according to its actual definition.
    const dummyAlbum: AlbumInfoDTO = {} as AlbumInfoDTO;

    const artistAlbum: ArtistAlbumDTO = {
      artist: 'Test Artist',
      albums: [dummyAlbum],
    };

    expect(artistAlbum.artist).toBe('Test Artist');
    expect(Array.isArray(artistAlbum.albums)).toBe(true);
    expect(artistAlbum.albums).toHaveLength(1);
    expect(artistAlbum.albums[0]).toBe(dummyAlbum);
  });
});
