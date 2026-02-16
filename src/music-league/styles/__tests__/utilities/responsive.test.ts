/**
 * @file responsive.test.ts
 * @description Tests for Music League responsive utilities
 */

import { responsive } from '../../utilities/responsive';

describe('Music League Responsive', () => {
  it('should export responsive constants as strings', () => {
    Object.values(responsive).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('should have mobile visibility controls', () => {
    expect(responsive.hideOnMobile).toBe('hidden md:block');
    expect(responsive.showOnMobile).toBe('block md:hidden');
  });

  it('should have mobile grid configuration', () => {
    expect(responsive.mobileGrid).toBe('grid-cols-1 sm:grid-cols-2');
  });

  it('should have tablet grid configuration', () => {
    expect(responsive.tabletGrid).toBe(
      'md:grid-cols-2 lg:grid-cols-3',
    );
  });

  it('should have desktop grid configuration', () => {
    expect(responsive.desktopGrid).toBe(
      'xl:grid-cols-4 2xl:grid-cols-5',
    );
  });

  it('should use progressive enhancement approach', () => {
    // Mobile first, then larger screens
    expect(responsive.mobileGrid).toMatch(/^grid-cols-1/);
    expect(responsive.tabletGrid).toMatch(/^md:grid-cols/);
    expect(responsive.desktopGrid).toMatch(/^xl:grid-cols/);
  });

  it('should have ascending grid column counts', () => {
    // Extract base grid columns
    const mobileMatch =
      responsive.mobileGrid.match(/grid-cols-(\d+)/);
    const tabletMatch = responsive.tabletGrid.match(
      /md:grid-cols-(\d+)/,
    );
    const desktopMatch = responsive.desktopGrid.match(
      /xl:grid-cols-(\d+)/,
    );

    if (mobileMatch && tabletMatch && desktopMatch) {
      const mobileCols = parseInt(mobileMatch[1]);
      const tabletCols = parseInt(tabletMatch[1]);
      const desktopCols = parseInt(desktopMatch[1]);

      expect(mobileCols).toBeLessThanOrEqual(tabletCols);
      expect(tabletCols).toBeLessThanOrEqual(desktopCols);
    }
  });

  it('should have complementary visibility utilities', () => {
    // hideOnMobile and showOnMobile should be complementary
    expect(responsive.hideOnMobile).toContain('hidden');
    expect(responsive.hideOnMobile).toContain('md:block');

    expect(responsive.showOnMobile).toContain('block');
    expect(responsive.showOnMobile).toContain('md:hidden');
  });

  it('should have all required responsive properties', () => {
    const expectedProperties = [
      'hideOnMobile',
      'showOnMobile',
      'mobileGrid',
      'tabletGrid',
      'desktopGrid',
    ];
    expectedProperties.forEach((prop) => {
      expect(responsive).toHaveProperty(prop);
      expect(
        responsive[prop as keyof typeof responsive],
      ).toBeTruthy();
    });
  });
});
