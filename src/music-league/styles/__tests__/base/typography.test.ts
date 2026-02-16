/**
 * @file typography.test.ts
 * @description Tests for Music League typography styles
 */

import { text } from '../../base/typography';

describe('Music League Typography', () => {
  it('should export text constants as strings', () => {
    Object.values(text).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have hero text with gradient styling', () => {
    expect(text.hero).toContain('text-4xl');
    expect(text.hero).toContain('md:text-5xl');
    expect(text.hero).toContain('font-black');
    expect(text.hero).toContain('text-transparent');
    expect(text.hero).toContain('bg-clip-text');
    expect(text.hero).toContain('bg-gradient-to-r');
  });

  it('should have responsive heading styles', () => {
    expect(text.heading).toContain('text-2xl');
    expect(text.heading).toContain('md:text-3xl');
    expect(text.heading).toContain('font-bold');
    expect(text.heading).toContain('text-white');
  });

  it('should have subheading with proper styling', () => {
    expect(text.subheading).toContain('text-lg');
    expect(text.subheading).toContain('font-semibold');
    expect(text.subheading).toContain('text-gray-200');
  });

  it('should have body text styling', () => {
    expect(text.body).toBe('text-gray-300');
  });

  it('should have muted text styling', () => {
    expect(text.muted).toBe('text-gray-500');
  });

  it('should have accent text with gradient', () => {
    expect(text.accent).toContain('text-transparent');
    expect(text.accent).toContain('bg-clip-text');
    expect(text.accent).toContain('bg-gradient-to-r');
    expect(text.accent).toContain('from-purple-400');
    expect(text.accent).toContain('to-blue-400');
  });

  it('should have all required typography properties', () => {
    const expectedProperties = [
      'hero',
      'heading',
      'subheading',
      'body',
      'muted',
      'accent',
    ];
    expectedProperties.forEach((prop) => {
      expect(text).toHaveProperty(prop);
      expect(text[prop as keyof typeof text]).toBeTruthy();
    });
  });
});
