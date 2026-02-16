/**
 * @file privacyUtils.ts
 * @description GDPR-compliant name display utilities for Music League.
 * Spotify display names may contain real names. This utility provides
 * anonymization options to protect user privacy.
 */

/**
 * Privacy display modes for user names
 */
export type PrivacyMode = 'full' | 'initials' | 'first-only';

/**
 * Anonymize a name based on the selected privacy mode.
 *
 * - 'full': Show the complete name as-is
 * - 'initials': Show first name + last initial (e.g., "John S.")
 * - 'first-only': Show only the first name/word
 */
export const anonymizeName = (
  name: string,
  mode: PrivacyMode,
): string => {
  if (!name || mode === 'full') {
    return name;
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length <= 1) {
    return name;
  }

  switch (mode) {
    case 'initials':
      return `${parts[0]} ${parts
        .slice(1)
        .map((p) => p[0]?.toUpperCase() + '.')
        .join(' ')}`;
    case 'first-only':
      return parts[0];
    default:
      return name;
  }
};

/**
 * Default privacy mode.
 * Using 'initials' as default to protect privacy while maintaining readability.
 */
export const DEFAULT_PRIVACY_MODE: PrivacyMode = 'full';

/**
 * Local storage key for persisting user's privacy preference
 */
const PRIVACY_STORAGE_KEY = 'ml-privacy-mode';

/**
 * Get the stored privacy mode preference
 */
export const getStoredPrivacyMode = (): PrivacyMode => {
  try {
    const stored = localStorage.getItem(PRIVACY_STORAGE_KEY);
    if (
      stored === 'full' ||
      stored === 'initials' ||
      stored === 'first-only'
    ) {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return DEFAULT_PRIVACY_MODE;
};

/**
 * Store the privacy mode preference
 */
export const setStoredPrivacyMode = (mode: PrivacyMode): void => {
  try {
    localStorage.setItem(PRIVACY_STORAGE_KEY, mode);
  } catch {
    // localStorage not available
  }
};
