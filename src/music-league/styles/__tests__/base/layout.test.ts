/**
 * @file layout.test.ts
 * @description Tests for Music League layout utilities
 */

import { layout } from '../../base/layout';

describe('Music League Layout', () => {
  it('should export layout constants as strings', () => {
    Object.values(layout).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have page layout with gradient background', () => {
    expect(layout.page).toContain('min-h-screen');
    expect(layout.page).toContain('bg-gradient-to-br');
    expect(layout.page).toContain('from-slate-950');
    expect(layout.page).toContain('via-gray-900');
    expect(layout.page).toContain('to-black');
  });

  it('should have responsive container classes', () => {
    expect(layout.container).toContain('max-w-7xl');
    expect(layout.container).toContain('mx-auto');
    expect(layout.container).toContain('px-4');
    expect(layout.container).toContain('sm:px-6');
    expect(layout.container).toContain('lg:px-8');
    expect(layout.container).toContain('py-6');
  });

  it('should have grid layout with responsive columns', () => {
    expect(layout.grid).toContain('grid');
    expect(layout.grid).toContain('grid-cols-1');
    expect(layout.grid).toContain('md:grid-cols-2');
    expect(layout.grid).toContain('lg:grid-cols-3');
    expect(layout.grid).toContain('xl:grid-cols-4');
    expect(layout.grid).toContain('gap-6');
  });

  it('should have flexbox utilities', () => {
    expect(layout.flexCenter).toBe(
      'flex items-center justify-center',
    );
    expect(layout.flexBetween).toBe(
      'flex items-center justify-between',
    );
  });

  it('should have section spacing', () => {
    expect(layout.section).toBe('mb-8');
  });

  it('should have all required layout properties', () => {
    const expectedProperties = [
      'page',
      'container',
      'section',
      'grid',
      'flexCenter',
      'flexBetween',
      'gridCols1',
      'cardContent',
      'centeredContent',
    ];
    expectedProperties.forEach((prop) => {
      expect(layout).toHaveProperty(prop);
      expect(layout[prop as keyof typeof layout]).toBeTruthy();
    });
  });
});
