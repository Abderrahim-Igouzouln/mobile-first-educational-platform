import { useState, useEffect, useCallback, useRef } from 'react';

interface UseQuizTimerReturn {
  secondsRemaining: number;
  formattedTime: string;
  isExpired: boolean;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (newDuration?: number) => void;
}

export const useQuizTimer = (
  durationSeconds: number,
  onExpire?: () => void,
): UseQuizTimerReturn => {
  const [secondsRemaining, setSecondsRemaining] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning || secondsRemaining <= 0) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);
  const reset = useCallback(
    (newDuration?: number) => {
      clearTimer();
      setIsRunning(false);
      setSecondsRemaining(newDuration ?? durationSeconds);
    },
    [clearTimer, durationSeconds],
  );

  const minutes = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${minutes}:${secs.toString().padStart(2, '0')}`;

  return {
    secondsRemaining,
    formattedTime,
    isExpired: secondsRemaining <= 0,
    isRunning,
    start,
    pause,
    reset,
  };
};
