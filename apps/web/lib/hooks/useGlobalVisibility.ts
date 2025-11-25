"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * A custom hook to manage a single, persistent (in localStorage)
 * global visibility state for all items.
 *
 * @param localStorageKey The unique key to use for localStorage.
 * @param defaultVisibility The default global state (true = visible).
 */
export function useGlobalVisibility(
  localStorageKey: string,
  defaultVisibility: boolean = true
) {
  // STATE: Load the single boolean state from localStorage on mount
  const [isGloballyVisible, setIsGloballyVisible] = useState<boolean>(() => {
    // This initializer function runs only on the client, on component mount
    if (typeof window === "undefined") {
      return defaultVisibility; // On the server, use the default value
    }
    try {
      // Try to get the saved state from localStorage
      const storedValue = localStorage.getItem(localStorageKey);
      
      // If it exists, parse it. If not, return the specified default.
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
      return defaultVisibility;
    } catch (error) {
      console.error(
        `Failed to parse global visibility state from localStorage (key: ${localStorageKey})`,
        error
      );
      return defaultVisibility;
    }
  });

  // EFFECT: Save the state to localStorage *every time it changes*
  useEffect(() => {
    // This effect runs on the client every time isGloballyVisible changes
    if (typeof window === "undefined") {
      return; // Don't run on the server
    }
    try {
      // Save the current state to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(isGloballyVisible));
    } catch (error) {
      console.error(
        `Failed to save global visibility state to localStorage (key: ${localStorageKey})`,
        error
      );
    }
  }, [isGloballyVisible, localStorageKey]); // Re-run if state or key changes

  /**
   * Toggles the global visibility state. All components using this hook
   * will update simultaneously.
   */
  const toggleGlobalVisibility = useCallback(() => {
    setIsGloballyVisible((prev) => !prev);
  }, []);

  // API: Return the current state and the toggle function
  return { isGloballyVisible, toggleGlobalVisibility };
}