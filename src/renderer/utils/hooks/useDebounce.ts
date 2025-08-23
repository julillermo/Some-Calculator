import { useEffect, useRef } from 'react';

export const useDebounce = <T extends string>(
  value: T,
  delay = 300
): T | null => {
  const valueRef = useRef<T>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      valueRef.current = value;
      timeoutRef.current = null;
    }, delay);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, delay]);

  return valueRef.current;
};
