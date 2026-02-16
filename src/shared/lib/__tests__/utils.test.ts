/**
 * @jest-environment jsdom
 */

import { describe, expect, it } from '@jest/globals';

import { cn } from '../utils';

describe('utils', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles empty strings', () => {
      expect(cn('', 'class1')).toBe('class1');
      expect(cn('class1', '')).toBe('class1');
      expect(cn('', '')).toBe('');
    });

    it('handles undefined and null values', () => {
      expect(cn(undefined, 'class1')).toBe('class1');
      expect(cn('class1', null)).toBe('class1');
      expect(cn(undefined, null)).toBe('');
    });

    it('handles boolean conditions', () => {
      expect(cn('class1', true && 'class2')).toBe('class1 class2');
      expect(cn('class1', false && 'class2')).toBe('class1');
    });

    it('handles arrays of class names', () => {
      expect(cn(['class1', 'class2'])).toBe('class1 class2');
      expect(cn(['class1', false && 'class2', 'class3'])).toBe(
        'class1 class3',
      );
    });

    it('handles objects with boolean values', () => {
      expect(cn({ class1: true, class2: false })).toBe('class1');
      expect(cn({ class1: true, class2: true })).toBe(
        'class1 class2',
      );
    });

    it('handles duplicate class names', () => {
      // twMerge keeps duplicates for non-conflicting classes
      expect(cn('class1', 'class1')).toBe('class1 class1');
      expect(cn('class1 class2', 'class1')).toBe(
        'class1 class2 class1',
      );
    });

    it('handles Tailwind CSS conflicts correctly', () => {
      // twMerge should handle conflicting Tailwind classes
      expect(cn('p-4', 'p-2')).toBe('p-2'); // Later padding should override
      expect(cn('text-red-500', 'text-blue-500')).toBe(
        'text-blue-500',
      ); // Later color should override
    });

    it('preserves non-conflicting Tailwind classes', () => {
      expect(cn('p-4', 'text-red-500')).toBe('p-4 text-red-500');
      expect(cn('bg-blue-500', 'hover:bg-red-500')).toBe(
        'bg-blue-500 hover:bg-red-500',
      );
    });

    it('handles complex Tailwind modifiers', () => {
      expect(cn('hover:p-4', 'hover:p-2')).toBe('hover:p-2');
      expect(cn('lg:text-xl', 'md:text-lg')).toBe(
        'lg:text-xl md:text-lg',
      );
    });

    it('handles mixed input types', () => {
      expect(
        cn(
          'base-class',
          ['array-class'],
          { 'object-class': true, 'false-class': false },
          true && 'conditional-class',
          null,
          undefined,
        ),
      ).toBe('base-class array-class object-class conditional-class');
    });

    it('handles empty input', () => {
      expect(cn()).toBe('');
    });

    it('handles single class name', () => {
      expect(cn('single-class')).toBe('single-class');
    });

    it('handles spaces in class names', () => {
      expect(cn('class1 class2', 'class3')).toBe(
        'class1 class2 class3',
      );
    });

    it('handles complex real-world scenarios', () => {
      // Common pattern in React components
      const isActive = true;
      const isDisabled = false;
      const variant = 'primary';

      const result = cn(
        'btn',
        'px-4 py-2',
        {
          'btn-active': isActive,
          'btn-disabled': isDisabled,
        },
        variant === 'primary' && 'btn-primary',
        'hover:bg-opacity-80',
      );

      expect(result).toBe(
        'btn px-4 py-2 btn-active btn-primary hover:bg-opacity-80',
      );
    });

    it('handles Tailwind utility conflicts in complex scenarios', () => {
      const result = cn(
        'p-4 text-sm bg-white',
        'p-6 text-lg', // Should override padding and text size
        'border border-gray-200',
      );

      expect(result).toBe(
        'bg-white p-6 text-lg border border-gray-200',
      );
    });
  });
});
