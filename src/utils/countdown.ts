const COUNTDOWN_DURATION = 5 * 60 * 1000;
const STORAGE_KEY = "mf_countdown_started";

export function getCountdownStart(): number | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? parseInt(stored, 10) : null;
}

export function setCountdownStart(): void {
  const now = Date.now();
  localStorage.setItem(STORAGE_KEY, now.toString());
}

export function getRemainingTime(): number {
  const startTime = getCountdownStart();
  if (!startTime) return 0;

  const elapsed = Date.now() - startTime;
  const remaining = COUNTDOWN_DURATION - elapsed;

  return Math.max(0, remaining);
}

export function isCountdownActive(): boolean {
  return getRemainingTime() > 0;
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function clearCountdown(): void {
  localStorage.removeItem(STORAGE_KEY);
}
