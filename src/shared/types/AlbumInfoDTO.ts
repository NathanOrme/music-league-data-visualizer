export interface AlbumInfoDTO {
  id?: number;
  albumName: string;
  albumArtist: string;
  albumYear: number;
  played: boolean;
  albumArtUrl?: string;
  wikipediaUrl?: string | null;
  genres?: string[];
  playedDate?: string;
  eventDate?: string;
}
