/**
 * @file spacing.test.ts
 * @description Tests for Music League spacing utilities
 */

import { spacing } from '../../utilities/spacing';

describe('Music League Spacing', () => {
  it('should export spacing constants as strings', () => {
    Object.values(spacing).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have section spacing', () => {
    expect(spacing.section).toBe('mb-6');
  });

  it('should have item spacing', () => {
    expect(spacing.item).toBe('mb-4');
  });

  it('should have small spacing', () => {
    expect(spacing.small).toBe('mb-2');
  });

  it('should have consistent margin-bottom pattern', () => {
    Object.values(spacing).forEach((value) => {
      expect(value).toMatch(/^mb-\d+$/);
    });
  });

  it('should have descending spacing values', () => {
    // Extract numbers from mb-* classes
    const sectionSpacing = parseInt(
      spacing.section.replace('mb-', ''),
    );
    const itemSpacing = parseInt(spacing.item.replace('mb-', ''));
    const smallSpacing = parseInt(spacing.small.replace('mb-', ''));

    expect(sectionSpacing).toBeGreaterThan(itemSpacing);
    expect(itemSpacing).toBeGreaterThan(smallSpacing);
  });

  it('should have all required spacing properties', () => {
    const expectedProperties = ['section', 'item', 'small'];
    expectedProperties.forEach((prop) => {
      expect(spacing).toHaveProperty(prop);
      expect(spacing[prop as keyof typeof spacing]).toBeTruthy();
    });
  });
});
