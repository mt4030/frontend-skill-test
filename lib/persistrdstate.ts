'use clent'
import { useState, useEffect } from "react";

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {

  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored === null || stored === "undefined") {
        return defaultValue;
      }

      return JSON.parse(stored) as T;
    } catch (err) {
      console.warn(`Failed to parse localStorage key "${key}"`, err);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.warn(`Failed to save localStorage key "${key}"`, err);
    }
  }, [key, state]);

  return [state, setState];
}
