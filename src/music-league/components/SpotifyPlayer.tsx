/**
 * @file SpotifyPlayer.tsx
 * @description Embedded Spotify player for Music League
 */

import {
  cardStyles,
  cn,
  textStyles,
} from '@/music-league/styles/playful-design-system';
import { type FC } from 'react';

interface SpotifyPlayerProps {
  playlistUrl: string;
  title?: string;
  description?: string;
}

export const SpotifyPlayer: FC<SpotifyPlayerProps> = ({
  playlistUrl,
  title,
  description,
}) => {
  const playlistId = playlistUrl.split('/playlist/')[1]?.split('?')[0];

  if (!playlistId) {
    return null;
  }

  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  return (
    <div className={cn(cardStyles.skyBlue, 'p-6')}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className={textStyles.heading}>{title}</h3>}
          {description && <p className={textStyles.muted}>{description}</p>}
        </div>
      )}

      <div className="relative w-full" style={{ paddingBottom: '380px' }}>
        <iframe
          className="absolute top-0 left-0 h-full w-full rounded-xl"
          src={embedUrl}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={title || 'Spotify Playlist'}
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer;
