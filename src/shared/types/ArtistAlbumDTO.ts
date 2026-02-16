import type { AlbumInfoDTO } from './AlbumInfoDTO';

export interface ArtistAlbumDTO {
  artist: string;
  albums: AlbumInfoDTO[];
}
