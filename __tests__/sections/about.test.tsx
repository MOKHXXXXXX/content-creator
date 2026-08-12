import { render, screen } from "@testing-library/react";
import { About } from "@/app/sections/About";

describe("About section", () => {
  it("renders the heading", () => {
    render(<About />);
    expect(
      screen.getByText(/I turn research into writing people actually read/i)
    ).toBeInTheDocument();
  });

  it("renders bio paragraphs", () => {
    render(<About />);
    expect(
      screen.getByText(/I'm a content writer who helps startups/i)
    ).toBeInTheDocument();
  });

  it("renders the expertise list", () => {
    render(<About />);
    expect(screen.getByText("B2B SaaS Blog Writing")).toBeInTheDocument();
    expect(screen.getByText("Landing Page & Website Copy")).toBeInTheDocument();
  });

  it("renders the stats", () => {
    render(<About />);
    expect(screen.getByText("5+")).toBeInTheDocument();
    expect(screen.getByText("Years Writing")).toBeInTheDocument();
  });
});
