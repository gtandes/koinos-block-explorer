import { useEffect, useRef } from "react";

export function useInterval() {
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []); // This effect cleans up the interval when the component unmounts

  const set = (callback: () => void, delay: number) => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current); // Clear any existing interval
    }
    intervalId.current = window.setInterval(callback, delay);
  };

  const clear = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  return {
    set,
    clear,
  };
}
