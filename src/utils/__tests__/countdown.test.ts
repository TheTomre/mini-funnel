import {
  getCountdownStart,
  setCountdownStart,
  getRemainingTime,
  isCountdownActive,
  formatTime,
  clearCountdown,
} from "../countdown";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("countdown utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("getCountdownStart", () => {
    it("should return null when no start time stored", () => {
      localStorageMock.getItem.mockReturnValue(null);
      expect(getCountdownStart()).toBeNull();
    });

    it("should return stored timestamp", () => {
      const timestamp = "1234567890";
      localStorageMock.getItem.mockReturnValue(timestamp);
      expect(getCountdownStart()).toBe(1234567890);
    });
  });

  describe("setCountdownStart", () => {
    it("should store current timestamp", () => {
      const mockNow = 1234567890;
      jest.spyOn(Date, "now").mockReturnValue(mockNow);

      setCountdownStart();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "mf_countdown_started",
        mockNow.toString()
      );
    });
  });

  describe("getRemainingTime", () => {
    it("should return 0 when no start time", () => {
      localStorageMock.getItem.mockReturnValue(null);
      expect(getRemainingTime()).toBe(0);
    });

    it("should return remaining time when countdown is active", () => {
      const startTime = Date.now() - 60000; // 1 minute ago
      localStorageMock.getItem.mockReturnValue(startTime.toString());

      const remaining = getRemainingTime();
      expect(remaining).toBeGreaterThan(0);
      expect(remaining).toBeLessThan(5 * 60 * 1000); // Less than 5 minutes
    });

    it("should return 0 when countdown has expired", () => {
      const startTime = Date.now() - 6 * 60 * 1000; // 6 minutes ago
      localStorageMock.getItem.mockReturnValue(startTime.toString());

      expect(getRemainingTime()).toBe(0);
    });
  });

  describe("isCountdownActive", () => {
    it("should return false when no start time", () => {
      localStorageMock.getItem.mockReturnValue(null);
      expect(isCountdownActive()).toBe(false);
    });

    it("should return true when countdown is active", () => {
      const startTime = Date.now() - 60000; // 1 minute ago
      localStorageMock.getItem.mockReturnValue(startTime.toString());
      expect(isCountdownActive()).toBe(true);
    });

    it("should return false when countdown has expired", () => {
      const startTime = Date.now() - 6 * 60 * 1000; // 6 minutes ago
      localStorageMock.getItem.mockReturnValue(startTime.toString());
      expect(isCountdownActive()).toBe(false);
    });
  });

  describe("formatTime", () => {
    it("should format time correctly", () => {
      expect(formatTime(0)).toBe("00:00");
      expect(formatTime(1000)).toBe("00:01");
      expect(formatTime(60000)).toBe("01:00");
      expect(formatTime(125000)).toBe("02:05");
    });
  });

  describe("clearCountdown", () => {
    it("should remove countdown from localStorage", () => {
      clearCountdown();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "mf_countdown_started"
      );
    });
  });
});
