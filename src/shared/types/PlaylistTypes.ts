import type { AlbumInfoDTO } from './AlbumInfoDTO';

export type PlaylistPeriod = 'WEEK' | 'MONTH' | 'YEAR';

export const PLAYLIST_PERIOD_COUNTS: Record<PlaylistPeriod, number> =
  {
    WEEK: 7,
    MONTH: 28,
    YEAR: 365,
  };

export interface PlaylistResponse {
  period: PlaylistPeriod;
  requestedCount?: number;
  returnedCount?: number;
  albums: AlbumInfoDTO[];
  partialResult?: boolean;
  message?: string;
  generatedAt?: string;
}
