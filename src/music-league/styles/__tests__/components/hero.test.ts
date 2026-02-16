/**
 * @file hero.test.ts
 * @description Tests for Music League hero section styles
 */

import { hero } from '../../components/hero';

describe('Music League Hero', () => {
  it('should export hero constants as strings', () => {
    Object.values(hero).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have container with glass-morphism and gradient', () => {
    expect(hero.container).toContain('relative');
    expect(hero.container).toContain('overflow-hidden');
    expect(hero.container).toContain('rounded-3xl');
    expect(hero.container).toContain('bg-gradient-to-r');
    expect(hero.container).toContain('from-purple-900/50');
    expect(hero.container).toContain('via-blue-900/50');
    expect(hero.container).toContain('to-teal-900/50');
    expect(hero.container).toContain('backdrop-blur-xl');
    expect(hero.container).toContain('border');
    expect(hero.container).toContain('border-white/10');
    expect(hero.container).toContain('p-8');
    expect(hero.container).toContain('mb-8');
  });

  it('should have background overlay with gradient', () => {
    expect(hero.background).toContain('absolute');
    expect(hero.background).toContain('inset-0');
    expect(hero.background).toContain('bg-gradient-to-br');
    expect(hero.background).toContain('from-purple-500/20');
    expect(hero.background).toContain('via-blue-500/20');
    expect(hero.background).toContain('to-teal-500/20');
    expect(hero.background).toContain('opacity-30');
  });

  it('should have content with proper z-index', () => {
    expect(hero.content).toBe('relative z-10');
  });

  it('should have responsive title with gradient text', () => {
    expect(hero.title).toContain('text-5xl');
    expect(hero.title).toContain('md:text-6xl');
    expect(hero.title).toContain('font-black');
    expect(hero.title).toContain('text-transparent');
    expect(hero.title).toContain('bg-clip-text');
    expect(hero.title).toContain('bg-gradient-to-r');
    expect(hero.title).toContain('from-white');
    expect(hero.title).toContain('via-purple-200');
    expect(hero.title).toContain('to-blue-200');
    expect(hero.title).toContain('mb-4');
  });

  it('should have subtitle styling', () => {
    expect(hero.subtitle).toContain('text-xl');
    expect(hero.subtitle).toContain('text-gray-300');
    expect(hero.subtitle).toContain('mb-8');
    expect(hero.subtitle).toContain('max-w-2xl');
  });

  it('should have responsive stats grid', () => {
    expect(hero.stats).toContain('grid');
    expect(hero.stats).toContain('grid-cols-2');
    expect(hero.stats).toContain('md:grid-cols-4');
    expect(hero.stats).toContain('gap-4');
    expect(hero.stats).toContain('mb-8');
  });

  it('should have stat card with glass effect', () => {
    expect(hero.statCard).toContain('bg-white/10');
    expect(hero.statCard).toContain('backdrop-blur-sm');
    expect(hero.statCard).toContain('rounded-2xl');
    expect(hero.statCard).toContain('p-4');
    expect(hero.statCard).toContain('border');
    expect(hero.statCard).toContain('border-white/20');
  });

  it('should have stat number with gradient text', () => {
    expect(hero.statNumber).toContain('text-3xl');
    expect(hero.statNumber).toContain('font-bold');
    expect(hero.statNumber).toContain('text-transparent');
    expect(hero.statNumber).toContain('bg-clip-text');
    expect(hero.statNumber).toContain('bg-gradient-to-r');
    expect(hero.statNumber).toContain('from-purple-300');
    expect(hero.statNumber).toContain('to-blue-300');
  });

  it('should have stat label styling', () => {
    expect(hero.statLabel).toContain('text-sm');
    expect(hero.statLabel).toContain('text-gray-400');
    expect(hero.statLabel).toContain('uppercase');
    expect(hero.statLabel).toContain('tracking-wide');
  });

  it('should have all required hero properties', () => {
    const expectedProperties = [
      'container',
      'background',
      'content',
      'title',
      'subtitle',
      'stats',
      'statCard',
      'statNumber',
      'statLabel',
    ];
    expectedProperties.forEach((prop) => {
      expect(hero).toHaveProperty(prop);
      expect(hero[prop as keyof typeof hero]).toBeTruthy();
    });
  });
});
