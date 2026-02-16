/**
 * @file categories.test.ts
 * @description Tests for Music League category styles
 */

import { categories } from '../../components/categories';

describe('Music League Categories', () => {
  it('should export category constants as objects with string properties', () => {
    Object.values(categories).forEach((category) => {
      expect(typeof category).toBe('object');
      Object.values(category).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });
  });

  it('should have all category types', () => {
    const expectedCategories = ['1001', 'words', 'coffee', 'hos'];
    expectedCategories.forEach((cat) => {
      expect(categories).toHaveProperty(cat);
    });
  });

  it('should have consistent properties for each category', () => {
    const requiredProperties = [
      'gradient',
      'border',
      'icon',
      'accent',
    ];

    Object.values(categories).forEach((category) => {
      requiredProperties.forEach((prop) => {
        expect(category).toHaveProperty(prop);
        expect(category[prop as keyof typeof category]).toBeTruthy();
      });
    });
  });

  describe('1001 category', () => {
    it('should have purple-pink-red gradient theme', () => {
      const cat1001 = categories['1001'];
      expect(cat1001.gradient).toContain('bg-gradient-to-br');
      expect(cat1001.gradient).toContain('from-purple-600/20');
      expect(cat1001.gradient).toContain('via-pink-600/20');
      expect(cat1001.gradient).toContain('to-red-600/20');
      expect(cat1001.border).toBe('border-purple-500/30');
      expect(cat1001.icon).toBe('text-purple-400');
      expect(cat1001.accent).toBe('text-purple-300');
    });
  });

  describe('words category', () => {
    it('should have blue-teal-green gradient theme', () => {
      const catWords = categories.words;
      expect(catWords.gradient).toContain('bg-gradient-to-br');
      expect(catWords.gradient).toContain('from-blue-600/20');
      expect(catWords.gradient).toContain('via-teal-600/20');
      expect(catWords.gradient).toContain('to-green-600/20');
      expect(catWords.border).toBe('border-blue-500/30');
      expect(catWords.icon).toBe('text-blue-400');
      expect(catWords.accent).toBe('text-blue-300');
    });
  });

  describe('coffee category', () => {
    it('should have orange-yellow-red gradient theme', () => {
      const catCoffee = categories.coffee;
      expect(catCoffee.gradient).toContain('bg-gradient-to-br');
      expect(catCoffee.gradient).toContain('from-orange-600/20');
      expect(catCoffee.gradient).toContain('via-yellow-600/20');
      expect(catCoffee.gradient).toContain('to-red-600/20');
      expect(catCoffee.border).toBe('border-orange-500/30');
      expect(catCoffee.icon).toBe('text-orange-400');
      expect(catCoffee.accent).toBe('text-orange-300');
    });
  });

  describe('hos category', () => {
    it('should have teal-green-blue gradient theme', () => {
      const catHos = categories.hos;
      expect(catHos.gradient).toContain('bg-gradient-to-br');
      expect(catHos.gradient).toContain('from-teal-600/20');
      expect(catHos.gradient).toContain('via-green-600/20');
      expect(catHos.gradient).toContain('to-blue-600/20');
      expect(catHos.border).toBe('border-teal-500/30');
      expect(catHos.icon).toBe('text-teal-400');
      expect(catHos.accent).toBe('text-teal-300');
    });
  });

  it('should use consistent gradient pattern across categories', () => {
    Object.values(categories).forEach((category) => {
      expect(category.gradient).toMatch(
        /^bg-gradient-to-br from-\w+-600\/20 via-\w+-600\/20 to-\w+-600\/20$/,
      );
    });
  });

  it('should use consistent border pattern across categories', () => {
    Object.values(categories).forEach((category) => {
      expect(category.border).toMatch(/^border-\w+-500\/30$/);
    });
  });

  it('should use consistent icon color pattern across categories', () => {
    Object.values(categories).forEach((category) => {
      expect(category.icon).toMatch(/^text-\w+-400$/);
    });
  });

  it('should use consistent accent color pattern across categories', () => {
    Object.values(categories).forEach((category) => {
      expect(category.accent).toMatch(/^text-\w+-300$/);
    });
  });
});
