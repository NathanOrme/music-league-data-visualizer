/**
 * @file SocialLinks.tsx
 * @description Enhanced Social Links Component with MagicUI
 */

import { Button } from '@/shared/components/ui';
import type { FC } from 'react';
import { memo } from 'react';

export interface SocialLinksProps {
  social: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    discord?: string;
  };
}

/**
 * Enhanced Social Links Component with MagicUI
 */
export const SocialLinks: FC<SocialLinksProps> = memo(
  ({ social }) => {
    return (
      <div className="flex flex-wrap gap-2">
        {social.twitter && (
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              window.open(
                social.twitter,
                '_blank',
                'noopener,noreferrer',
              )
            }
            className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/50"
          >
            🐦 Twitter
          </Button>
        )}
        {social.instagram && (
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              window.open(
                social.instagram,
                '_blank',
                'noopener,noreferrer',
              )
            }
            className="border-pink-500/30 text-pink-300 hover:bg-pink-500/10 hover:border-pink-500/50"
          >
            📷 Instagram
          </Button>
        )}
        {social.facebook && (
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              window.open(
                social.facebook,
                '_blank',
                'noopener,noreferrer',
              )
            }
            className="border-blue-600/30 text-blue-400 hover:bg-blue-600/10 hover:border-blue-600/50"
          >
            👥 Facebook
          </Button>
        )}
        {social.discord && (
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              window.open(
                social.discord,
                '_blank',
                'noopener,noreferrer',
              )
            }
            className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/50"
          >
            💬 Discord
          </Button>
        )}
      </div>
    );
  },
);

SocialLinks.displayName = 'SocialLinks';
