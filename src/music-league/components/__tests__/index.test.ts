/**
 * @file index.test.ts
 * @description Tests for Music League component exports
 */

import {
  LeagueAccordionCard,
  PlaylistsGallery,
  SpotifyPlayer,
  TabNavigation,
} from '../index';

describe('Music League Index Exports', () => {
  it('should expose the simplified component set', () => {
    const exports = {
      LeagueAccordionCard,
      PlaylistsGallery,
      SpotifyPlayer,
      TabNavigation,
    };

    Object.entries(exports).forEach(([, component]) => {
      expect(component).toBeDefined();
      expect(typeof component).toBe('function');
    });
  });
});
