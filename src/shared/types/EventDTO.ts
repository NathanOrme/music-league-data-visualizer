import type { AlbumInfoDTO } from './AlbumInfoDTO';

export interface EventDTO {
  id?: number;
  eventDate: string;
  eventTheme?: string;
  albums?: AlbumInfoDTO[];
  eventNotes?: string;
}
