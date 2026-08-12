import { render, screen } from "@testing-library/react";
import { Footer } from "@/app/sections/Footer";

describe("Footer", () => {
  it("renders the copyright", () => {
    render(<Footer />);
    expect(screen.getAllByText(/Youssef Mohey/i).length).toBeGreaterThan(0);
  });

  it("renders the privacy policy link", () => {
    render(<Footer />);
    const link = screen.getByText(/Privacy Policy/i);
    expect(link.closest("a")).toHaveAttribute("href", "/privacy");
  });

  it("includes the current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});