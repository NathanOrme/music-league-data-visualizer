/**
 * @file animations.test.ts
 * @description Tests for Music League animation utilities
 */

import { animations, loading } from '../../utilities/animations';

describe('Music League Animations', () => {
  describe('animations', () => {
    it('should export animation constants as strings', () => {
      Object.values(animations).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have fade in animation', () => {
      expect(animations.fadeIn).toBe('animate-fade-in');
    });

    it('should have slide up animation', () => {
      expect(animations.slideUp).toBe('animate-slide-up');
    });

    it('should have bounce animation', () => {
      expect(animations.bounce).toBe('animate-bounce-subtle');
    });

    it('should have glow animation', () => {
      expect(animations.glow).toBe('animate-glow');
    });

    it('should have animate prefix for all animations', () => {
      Object.values(animations).forEach((value) => {
        expect(value).toMatch(/^animate-/);
      });
    });

    it('should have all required animation properties', () => {
      const expectedProperties = [
        'fadeIn',
        'slideUp',
        'bounce',
        'glow',
      ];
      expectedProperties.forEach((prop) => {
        expect(animations).toHaveProperty(prop);
        expect(
          animations[prop as keyof typeof animations],
        ).toBeTruthy();
      });
    });
  });

  describe('loading', () => {
    it('should export loading constants as strings', () => {
      Object.values(loading).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have loading container with pulse animation', () => {
      expect(loading.container).toBe('animate-pulse');
    });

    it('should have skeleton styling', () => {
      expect(loading.skeleton).toContain('bg-white/10');
      expect(loading.skeleton).toContain('rounded-lg');
    });

    it('should have shimmer effect with gradient animation', () => {
      expect(loading.shimmer).toContain('bg-gradient-to-r');
      expect(loading.shimmer).toContain('from-transparent');
      expect(loading.shimmer).toContain('via-white/10');
      expect(loading.shimmer).toContain('to-transparent');
      expect(loading.shimmer).toContain('animate-shimmer');
    });

    it('should have all required loading properties', () => {
      const expectedProperties = ['container', 'skeleton', 'shimmer'];
      expectedProperties.forEach((prop) => {
        expect(loading).toHaveProperty(prop);
        expect(loading[prop as keyof typeof loading]).toBeTruthy();
      });
    });
  });
});
