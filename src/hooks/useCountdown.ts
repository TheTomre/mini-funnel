import { useState, useEffect, useCallback } from "react";
import {
  getRemainingTime,
  isCountdownActive,
  formatTime,
} from "../utils/countdown";
import type { CountdownState } from "../types";

export function useCountdown(): CountdownState {
  const [remainingTime, setRemainingTime] = useState(0);

  const updateCountdown = useCallback(() => {
    const time = getRemainingTime();
    setRemainingTime(time);
  }, []);

  useEffect(() => {
    // Initial update
    updateCountdown();

    // Set up interval to update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [updateCountdown]);

  return {
    isActive: isCountdownActive(),
    remainingTime,
    formattedTime: formatTime(remainingTime),
  };
}
