/**
 * @file empty.test.ts
 * @description Tests for Music League empty state utilities
 */

import { empty } from '../../utilities/empty';

describe('Music League Empty States', () => {
  it('should export empty constants as strings', () => {
    Object.values(empty).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have container with padding', () => {
    expect(empty.container).toContain('py-12');
    expect(empty.container).toContain('px-6');
  });

  it('should have icon styling', () => {
    expect(empty.icon).toContain('w-16');
    expect(empty.icon).toContain('h-16');
    expect(empty.icon).toContain('text-gray-500');
    expect(empty.icon).toContain('mb-4');
  });

  it('should have title styling', () => {
    expect(empty.title).toContain('text-xl');
    expect(empty.title).toContain('font-semibold');
    expect(empty.title).toContain('text-white');
    expect(empty.title).toContain('mb-2');
  });

  it('should have description styling', () => {
    expect(empty.description).toBe('text-gray-400');
  });

  it('should have consistent spacing progression', () => {
    // Icon has mb-4, title has mb-2, creating visual hierarchy
    expect(empty.icon).toContain('mb-4');
    expect(empty.title).toContain('mb-2');
  });

  it('should use consistent color scheme', () => {
    expect(empty.icon).toContain('text-gray-500');
    expect(empty.title).toContain('text-white');
    expect(empty.description).toContain('text-gray-400');
  });

  it('should have large icon size for visibility', () => {
    expect(empty.icon).toContain('w-16');
    expect(empty.icon).toContain('h-16');
  });

  it('should have all required empty state properties', () => {
    const expectedProperties = [
      'container',
      'icon',
      'title',
      'description',
    ];
    expectedProperties.forEach((prop) => {
      expect(empty).toHaveProperty(prop);
      expect(empty[prop as keyof typeof empty]).toBeTruthy();
    });
  });
});
