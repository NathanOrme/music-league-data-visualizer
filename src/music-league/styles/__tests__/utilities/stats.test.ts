/**
 * @file stats.test.ts
 * @description Tests for Music League statistics utilities
 */

import { stats } from '../../utilities/stats';

describe('Music League Stats', () => {
  it('should export stats constants as strings', () => {
    Object.values(stats).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have container with grid layout', () => {
    expect(stats.container).toContain('grid');
    expect(stats.container).toContain('grid-cols-3');
    expect(stats.container).toContain('gap-4');
    expect(stats.container).toContain('mb-8');
  });

  it('should have value styling with purple color', () => {
    expect(stats.value).toContain('text-3xl');
    expect(stats.value).toContain('font-bold');
    expect(stats.value).toContain('text-purple-300');
  });

  it('should have green value styling', () => {
    expect(stats.valueGreen).toContain('text-3xl');
    expect(stats.valueGreen).toContain('font-bold');
    expect(stats.valueGreen).toContain('text-green-300');
  });

  it('should have purple value styling (alternative)', () => {
    expect(stats.valuePurple).toContain('text-3xl');
    expect(stats.valuePurple).toContain('font-bold');
    expect(stats.valuePurple).toContain('text-blue-300');
  });

  it('should have label styling', () => {
    expect(stats.label).toContain('text-gray-400');
    expect(stats.label).toContain('text-sm');
  });

  it('should have description styling', () => {
    expect(stats.description).toContain('text-gray-300');
    expect(stats.description).toContain('text-lg');
  });

  it('should have consistent value sizing across variants', () => {
    const valueClasses = [
      stats.value,
      stats.valueGreen,
      stats.valuePurple,
    ];
    valueClasses.forEach((valueClass) => {
      expect(valueClass).toContain('text-3xl');
      expect(valueClass).toContain('font-bold');
    });
  });

  it('should use distinct colors for different value types', () => {
    expect(stats.value).toContain('purple-300');
    expect(stats.valueGreen).toContain('green-300');
    expect(stats.valuePurple).toContain('blue-300');
  });

  it('should have all required stats properties', () => {
    const expectedProperties = [
      'container',
      'value',
      'valueGreen',
      'valuePurple',
      'label',
      'description',
    ];
    expectedProperties.forEach((prop) => {
      expect(stats).toHaveProperty(prop);
      expect(stats[prop as keyof typeof stats]).toBeTruthy();
    });
  });
});
