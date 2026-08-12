jest.mock("framer-motion", () => ({
  motion: {
    div: "div",
    span: "span",
    path: "path",
    svg: "svg",
    header: "header",
    a: "a",
    button: "button",
    li: "li",
    ul: "ul",
    section: "section",
    p: "p",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useReducedMotion: () => null,
  useScroll: () => ({
    scrollY: { get: () => 0, onChange: jest.fn(), on: jest.fn(), clearListeners: jest.fn() },
    scrollYProgress: { get: () => 0, onChange: jest.fn(), on: jest.fn(), clearListeners: jest.fn() },
  }),
  useMotionValueEvent: jest.fn(),
  useInView: () => [jest.fn(), true],
  useAnimation: () => ({ start: jest.fn(), stop: jest.fn() }),
  useTransform: jest.fn(() => ({ get: () => 0 })),
  useMotionValue: jest.fn(() => ({ get: () => 0, set: jest.fn() })),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";

describe("Navbar", () => {
  it("renders the site name", () => {
    render(<Navbar />);
    expect(screen.getByText("Youssef Mohey")).toBeInTheDocument();
  });

  it("renders all navigation links on desktop", () => {
    render(<Navbar />);
    const desktopNav = document.querySelector(".md\\:flex")!;
    expect(desktopNav).toBeInTheDocument();
    expect(desktopNav.textContent).toContain("About");
    expect(desktopNav.textContent).toContain("Services");
    expect(desktopNav.textContent).toContain("Work");
    expect(desktopNav.textContent).toContain("Contact");
  });

  it("toggles the mobile menu", () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText("Toggle menu");
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when a link is clicked", () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    const aboutLinks = screen.getAllByText("About");
    fireEvent.click(aboutLinks[1]);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("navigates to the home page from the logo", () => {
    render(<Navbar />);
    const logo = screen.getByText("Youssef Mohey");
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });
});
