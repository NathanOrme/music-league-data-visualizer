/**
 * @file MusicLeagueNav.tsx
 * @description Sub-navigation for Music League pages.
 * Shows category links prominently alongside Playlists and Analytics.
 */

import {
  allCategories,
  type CategoryTheme,
} from '@/music-league/config/league-themes';
import { mlNav } from '@/music-league/styles/music-league-theme';
import {
  BarChart3,
  Coffee,
  Disc3,
  Home,
  ListMusic,
  MessageSquare,
  Train,
} from 'lucide-react';
import { type FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  label: string;
  icon: FC<{ className?: string }>;
  accentColor?: string;
}

const categoryIcon = (id: string): FC<{ className?: string }> => {
  switch (id) {
    case '1001-leagues':
      return Disc3;
    case 'words':
      return MessageSquare;
    case 'coffee':
      return Coffee;
    case 'head-of-steam':
      return Train;
    default:
      return Disc3;
  }
};

const buildNavItems = (): NavItem[] => {
  const items: NavItem[] = [
    { path: '/music-league', label: 'Home', icon: Home },
  ];

  allCategories().forEach((cat: CategoryTheme) => {
    items.push({
      path: `/music-league/${cat.routePrefix}`,
      label: cat.name,
      icon: categoryIcon(cat.id),
      accentColor: cat.accent,
    });
  });

  items.push(
    {
      path: '/music-league/playlists',
      label: 'Playlists',
      icon: ListMusic,
    },
    {
      path: '/music-league/analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
  );

  return items;
};

const navItems = buildNavItems();

export const MusicLeagueNav: FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === '/music-league') {
      return location.pathname === '/music-league';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={mlNav.container}
      role="navigation"
      aria-label="Music League navigation"
    >
      {navItems.map((item) => {
        const active = isActive(item.path);
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={active ? mlNav.linkActive : mlNav.link}
            style={
              active && item.accentColor
                ? {
                    borderBottomColor: item.accentColor,
                    color: 'white',
                  }
                : active
                  ? { borderBottomColor: 'white' }
                  : undefined
            }
          >
            <span className="flex items-center gap-1.5">
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};
