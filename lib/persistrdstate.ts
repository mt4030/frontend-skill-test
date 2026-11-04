'use client';

import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);

  const [hydratedKey, setHydratedKey] = useState<string | null>(null);

  // Load persisted state after the component mounts
  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored && stored !== 'undefined') {
        setState(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.warn(
        `Failed to read localStorage key "${key}"`,
        error
      );
    } finally {
      setHydratedKey(key);
    }
  }, [key]);

  // Save only after the current key has been loaded
  useEffect(() => {
    if (hydratedKey !== key) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(
        `Failed to save localStorage key "${key}"`,
        error
      );
    }
  }, [key, state, hydratedKey]);

  return [state, setState];
}