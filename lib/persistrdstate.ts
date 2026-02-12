'use client'
import { useState, useEffect } from "react"

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {

  const isClient = typeof window !== "undefined"

  const [state, setState] = useState<T>(() => {
    if (!isClient) return defaultValue // SSR guard

    try {
      const stored = localStorage.getItem(key)
      if (!stored || stored === "undefined") return defaultValue
      return JSON.parse(stored) as T
    } catch (err) {
      console.warn(`Failed to parse localStorage key "${key}"`, err)
      return defaultValue
    }
  })

  useEffect(() => {
    if (!isClient) return
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      console.warn(`Failed to save localStorage key "${key}"`, err)
    }
  }, [key, state, isClient])

  return [state, setState]
}
