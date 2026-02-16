'use client';

import { cn } from '@/shared/lib/utils';

interface Avatar {
  imageUrl: string;
  profileUrl?: string;
  alt?: string;
}

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div
      className={cn(
        'z-10 flex -space-x-4 rtl:space-x-reverse',
        className,
      )}
    >
      {avatarUrls.map((avatar, index) => (
        <div key={index} className="relative">
          {avatar.profileUrl ? (
            <a
              href={avatar.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-110"
            >
              <img
                className="h-10 w-10 rounded-full border-2 border-white shadow-lg dark:border-gray-800"
                src={avatar.imageUrl}
                width={40}
                height={40}
                alt={avatar.alt || `Avatar ${index + 1}`}
                loading="lazy"
              />
            </a>
          ) : (
            <img
              className="h-10 w-10 rounded-full border-2 border-white shadow-lg dark:border-gray-800"
              src={avatar.imageUrl}
              width={40}
              height={40}
              alt={avatar.alt || `Avatar ${index + 1}`}
              loading="lazy"
            />
          )}
        </div>
      ))}
      {(numPeople ?? 0) > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white shadow-lg transition-all hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          +{numPeople}
        </div>
      )}
    </div>
  );
};
