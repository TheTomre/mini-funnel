import { promoCode } from "../promo";

describe("promoCode", () => {
  it("should generate correct promo code format", () => {
    const name = "John";
    const date = new Date("2024-09-15");
    const result = promoCode(name, date);

    expect(result).toBe("john_sept24");
  });

  it("should handle names with special characters", () => {
    const name = "José María";
    const date = new Date("2024-09-15");
    const result = promoCode(name, date);

    expect(result).toBe("josemaria_sept24");
  });

  it("should handle names with numbers and symbols", () => {
    const name = "User123!@#";
    const date = new Date("2024-09-15");
    const result = promoCode(name, date);

    expect(result).toBe("user_sept24");
  });

  it("should use current date when no date provided", () => {
    const name = "Test";
    const result = promoCode(name);

    expect(result).toMatch(/^test_[a-z]{3,4}\d{2}$/);
  });

  it("should handle different months correctly", () => {
    const name = "Test";
    const testCases = [
      { month: 0, expected: "jan" }, // January
      { month: 8, expected: "sept" }, // September
      { month: 11, expected: "dec" }, // December
    ];

    testCases.forEach(({ month, expected }) => {
      const date = new Date(2024, month, 15);
      const result = promoCode(name, date);
      expect(result).toContain(expected);
    });
  });
});
