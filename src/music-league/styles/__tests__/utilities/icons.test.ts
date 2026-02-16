/**
 * @file icons.test.ts
 * @description Tests for Music League icon utilities
 */

import { icons } from '../../utilities/icons';

describe('Music League Icons', () => {
  it('should export icon constants as strings', () => {
    Object.values(icons).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have small icon size', () => {
    expect(icons.small).toBe('w-4 h-4');
  });

  it('should have medium icon size', () => {
    expect(icons.medium).toBe('w-5 h-5');
  });

  it('should have large icon size', () => {
    expect(icons.large).toBe('w-6 h-6');
  });

  it('should have left section icon with margin', () => {
    expect(icons.leftSection).toBe('w-4 h-4 mr-2');
  });

  it('should have round section icon', () => {
    expect(icons.roundSection).toBe('w-4 h-4');
  });

  it('should have consistent width and height pattern', () => {
    Object.values(icons).forEach((value) => {
      expect(value).toMatch(/w-\d+ h-\d+/);
    });
  });

  it('should have ascending icon sizes', () => {
    // Extract size numbers from w-* classes
    const smallSize = parseInt(
      icons.small.match(/w-(\d+)/)?.[1] || '0',
    );
    const mediumSize = parseInt(
      icons.medium.match(/w-(\d+)/)?.[1] || '0',
    );
    const largeSize = parseInt(
      icons.large.match(/w-(\d+)/)?.[1] || '0',
    );

    expect(smallSize).toBeLessThan(mediumSize);
    expect(mediumSize).toBeLessThan(largeSize);
  });

  it('should have consistent size values between width and height', () => {
    Object.values(icons).forEach((value) => {
      const widthMatch = value.match(/w-(\d+)/);
      const heightMatch = value.match(/h-(\d+)/);

      if (widthMatch && heightMatch) {
        expect(widthMatch[1]).toBe(heightMatch[1]);
      }
    });
  });

  it('should have all required icon properties', () => {
    const expectedProperties = [
      'small',
      'medium',
      'large',
      'leftSection',
      'roundSection',
    ];
    expectedProperties.forEach((prop) => {
      expect(icons).toHaveProperty(prop);
      expect(icons[prop as keyof typeof icons]).toBeTruthy();
    });
  });
});
