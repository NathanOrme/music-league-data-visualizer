/**
 * @file TabNavigation.tsx
 * @description Responsive tab navigation for Music League
 */

import {
  cn,
  emojis,
  tabStyles,
} from '@/music-league/styles/playful-design-system';
import { Music, Users } from 'lucide-react';
import { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';

export type TabValue = 'leagues' | 'playlists';

interface TabNavigationProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}

interface TabConfig {
  value: TabValue;
  label: string;
  icon: typeof Music;
  emoji: string;
}

const tabs: TabConfig[] = [
  {
    value: 'leagues',
    label: 'Leagues',
    icon: Users,
    emoji: emojis.participants,
  },
  {
    value: 'playlists',
    label: 'Playlists',
    icon: Music,
    emoji: emojis.playlists,
  },
];

export const TabNavigation: FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [, setSearchParams] = useSearchParams();

  const handleTabClick = (tab: TabValue) => {
    onTabChange(tab);
    setSearchParams({ tab });
  };

  return (
    <>
      {/* Desktop Tabs (Top) */}
      <nav
        className={tabStyles.desktopContainer}
        role="tablist"
        aria-label="Music League sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            aria-controls={`${tab.value}-panel`}
            id={`${tab.value}-tab`}
            className={cn(
              activeTab === tab.value
                ? tabStyles.desktopTabActive
                : tabStyles.desktopTab,
            )}
            onClick={() => handleTabClick(tab.value)}
          >
            <span className="flex items-center gap-2">
              <tab.icon className="h-5 w-5" aria-hidden="true" />
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile Tabs (Bottom Navigation) */}
      <nav
        className={tabStyles.mobileContainer}
        role="tablist"
        aria-label="Music League sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            aria-controls={`${tab.value}-panel`}
            id={`${tab.value}-tab-mobile`}
            className={cn(
              activeTab === tab.value
                ? tabStyles.mobileTabActive
                : tabStyles.mobileTab,
            )}
            onClick={() => handleTabClick(tab.value)}
          >
            <tab.icon className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs font-semibold">{tab.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
