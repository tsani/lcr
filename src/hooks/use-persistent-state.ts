import React, { SetStateAction, useEffect, useState } from "react";

export interface LocalStorageAdapter<T> {
  toString: (x: T) => string;
  fromString: (x: string) => T;
}

/**
 * A state that persists through sessions by recording the value to localStorage.
 * Also watches localStorage for writes to update the value.
 * @param key The key to store the value in localStorage.
 * @param initialValue The initial value to store in the state. Is replaced by the value from localStorage if any.
 * @param adapter A process for converting the value to and from strings in localStorage.
 */
const usePersistentState = <T>(
  key: string,
  initialValue: T,
  adapter: LocalStorageAdapter<T>
): [T, React.Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const already = localStorage.getItem(key);
    if (null === already) return;
    setValue(adapter.fromString(already));
  }, [adapter, key]);

  const doSetValue: React.Dispatch<SetStateAction<T>> = (x) => {
    const newValue = "function" === typeof x ? (x as (x: T) => T)(value) : x;
    setValue(newValue);
    localStorage.setItem(key, adapter.toString(newValue));
  };
  return [value, doSetValue];
};

export const usePersistentNumber = (key: string, initialValue: number) =>
  usePersistentState(key, initialValue, {
    toString: (x) => x.toString(),
    fromString: (x) => parseFloat(x),
  });

export default usePersistentState;
