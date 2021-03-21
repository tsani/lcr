import { useState } from "react";

/**
 * Resolves after the given count of milliseconds.
 * @param ms
 */
export const timeout = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

/**
 * Computes a wrapper for the given function that uses a react state to ensure that the function is only running at
 * most once.
 * @param f The function to wrap.
 */
export function useOnceAsync<T>(
  f: () => Promise<T>
): () => Promise<{ result: T } | undefined> {
  const [running, setRunning] = useState(false);
  return async () => {
    if (running) return undefined;
    try {
      setRunning(true);
      return { result: await f() };
    } finally {
      setRunning(false);
    }
  };
}
