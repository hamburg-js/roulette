import { useEffect, useState, useCallback } from "react";

export default function useCountdown(seconds: number, onZero?: () => void) {
  const [time, setTime] = useState(0);
  const start = useCallback(() => {
    setTime(seconds);
  }, [seconds]);
  const abort = useCallback(() => {
    setTime(1);
  }, []);
  useEffect(() => {
    const handle = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        if (time === 1 && onZero) onZero();
      }
    }, 1000);
    return () => clearInterval(handle);
  });
  return [time, start, abort] as [number, () => void, () => void];
}
