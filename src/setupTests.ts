import "@testing-library/jest-dom";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

delete (window as { location?: unknown }).location;
(window as { location: Partial<Location> }).location = {
  href: "",
  reload: jest.fn(),
  assign: jest.fn(),
  replace: jest.fn(),
};
