/**
 * @file player.test.ts
 * @description Tests for Music League Spotify player styles
 */

import { player } from '../../components/player';

describe('Music League Player', () => {
  it('should export player constants as strings', () => {
    Object.values(player).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have container with relative positioning', () => {
    expect(player.container).toBe('relative w-full');
  });

  it('should have loading overlay with backdrop blur', () => {
    expect(player.loadingOverlay).toContain('absolute');
    expect(player.loadingOverlay).toContain('inset-0');
    expect(player.loadingOverlay).toContain('bg-black/50');
    expect(player.loadingOverlay).toContain('backdrop-blur-sm');
    expect(player.loadingOverlay).toContain('rounded-lg');
    expect(player.loadingOverlay).toContain('flex');
    expect(player.loadingOverlay).toContain('items-center');
    expect(player.loadingOverlay).toContain('justify-center');
    expect(player.loadingOverlay).toContain('z-10');
  });

  it('should have all required player properties', () => {
    const expectedProperties = ['container', 'loadingOverlay'];
    expectedProperties.forEach((prop) => {
      expect(player).toHaveProperty(prop);
      expect(player[prop as keyof typeof player]).toBeTruthy();
    });
  });

  it('should use glass-morphism effect for loading overlay', () => {
    expect(player.loadingOverlay).toContain('backdrop-blur-sm');
    expect(player.loadingOverlay).toContain('bg-black/50');
  });

  it('should have proper z-index for overlay', () => {
    expect(player.loadingOverlay).toContain('z-10');
  });
});
