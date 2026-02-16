import {
  anonymizeName,
  DEFAULT_PRIVACY_MODE,
  getStoredPrivacyMode,
  setStoredPrivacyMode,
} from '../privacyUtils';

describe('privacyUtils', () => {
  describe('anonymizeName', () => {
    it('returns full name in "full" mode', () => {
      expect(anonymizeName('John Smith', 'full')).toBe('John Smith');
    });

    it('returns initials in "initials" mode', () => {
      expect(anonymizeName('John Smith', 'initials')).toBe('John S.');
    });

    it('handles multi-word last names in initials mode', () => {
      expect(anonymizeName('John Van Der Berg', 'initials')).toBe(
        'John V. D. B.',
      );
    });

    it('returns first name only in "first-only" mode', () => {
      expect(anonymizeName('John Smith', 'first-only')).toBe('John');
    });

    it('returns single-word names unchanged in all modes', () => {
      expect(anonymizeName('DJ_Cool', 'initials')).toBe('DJ_Cool');
      expect(anonymizeName('DJ_Cool', 'first-only')).toBe('DJ_Cool');
      expect(anonymizeName('DJ_Cool', 'full')).toBe('DJ_Cool');
    });

    it('handles empty strings', () => {
      expect(anonymizeName('', 'initials')).toBe('');
      expect(anonymizeName('', 'first-only')).toBe('');
      expect(anonymizeName('', 'full')).toBe('');
    });

    it('handles whitespace-only strings', () => {
      expect(anonymizeName('   ', 'initials')).toBe('   ');
    });
  });

  describe('DEFAULT_PRIVACY_MODE', () => {
    it('should be "full" by default', () => {
      expect(DEFAULT_PRIVACY_MODE).toBe('full');
    });
  });

  describe('getStoredPrivacyMode / setStoredPrivacyMode', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('returns default when nothing stored', () => {
      expect(getStoredPrivacyMode()).toBe('full');
    });

    it('stores and retrieves privacy mode', () => {
      setStoredPrivacyMode('initials');
      expect(getStoredPrivacyMode()).toBe('initials');
    });

    it('stores and retrieves first-only mode', () => {
      setStoredPrivacyMode('first-only');
      expect(getStoredPrivacyMode()).toBe('first-only');
    });

    it('returns default for invalid stored value', () => {
      localStorage.setItem('ml-privacy-mode', 'invalid');
      expect(getStoredPrivacyMode()).toBe('full');
    });
  });
});
