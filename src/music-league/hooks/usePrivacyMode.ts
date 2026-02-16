/**
 * @file usePrivacyMode.ts
 * @description Hook for managing GDPR privacy mode for name display.
 */

import {
  anonymizeName,
  getStoredPrivacyMode,
  type PrivacyMode,
  setStoredPrivacyMode,
} from '@/music-league/utils/privacyUtils';
import { useCallback, useState } from 'react';

interface UsePrivacyModeResult {
  privacyMode: PrivacyMode;
  setPrivacyMode: (mode: PrivacyMode) => void;
  displayName: (name: string) => string;
}

/**
 * Hook that provides privacy mode state and a name display function.
 * Persists the user's preference in localStorage.
 */
export const usePrivacyMode = (): UsePrivacyModeResult => {
  const [privacyMode, setMode] = useState<PrivacyMode>(
    getStoredPrivacyMode,
  );

  const setPrivacyMode = useCallback((mode: PrivacyMode) => {
    setMode(mode);
    setStoredPrivacyMode(mode);
  }, []);

  const displayName = useCallback(
    (name: string) => anonymizeName(name, privacyMode),
    [privacyMode],
  );

  return { privacyMode, setPrivacyMode, displayName };
};
