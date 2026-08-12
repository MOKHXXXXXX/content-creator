// @ts-check

if (typeof window !== "undefined") {
  require("@testing-library/jest-dom");

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

if (
  typeof global !== "undefined" &&
  typeof (global as unknown as Record<string, unknown>).IntersectionObserver ===
    "undefined"
) {
  Object.defineProperty(global, "IntersectionObserver", {
    writable: true,
    value: jest
      .fn()
      .mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      })),
  });
}