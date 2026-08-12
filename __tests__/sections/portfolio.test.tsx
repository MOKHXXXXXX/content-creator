import { render, screen } from "@testing-library/react";
import { Portfolio } from "@/app/sections/Portfolio";

describe("Portfolio section", () => {
  it("renders the heading", () => {
    render(<Portfolio />);
    expect(
      screen.getByText(/Manuscripts worth reading/i)
    ).toBeInTheDocument();
  });

  it("renders filter pills", () => {
    render(<Portfolio />);
    expect(screen.getByText("All")).toBeInTheDocument();
    // Filter pills share text with card badges, so use getAllByText for duplicates
    expect(screen.getAllByText("SEO").length).toBeGreaterThan(0);
    expect(screen.getAllByText("COPY").length).toBeGreaterThan(0);
    expect(screen.getAllByText("BLOG").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SOCIAL").length).toBeGreaterThan(0);
  });

  it("renders portfolio cards with titles", () => {
    render(<Portfolio />);
    expect(
      screen.getByText("10 SEO Tips for Startups")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fintech Landing Page Copy")
    ).toBeInTheDocument();
    expect(screen.getByText("Wellness Blog Series")).toBeInTheDocument();
    expect(
      screen.getByText("E-Commerce Social Campaign")
    ).toBeInTheDocument();
  });

  it("renders word count and read time metadata", () => {
    render(<Portfolio />);
    expect(screen.getByText(/1,840 words/i)).toBeInTheDocument();
    expect(screen.getByText(/8 min read/i)).toBeInTheDocument();
  });

  it("links each card to its detail page", () => {
    render(<Portfolio />);
    const links = screen.getAllByRole("link");
    const portfolioLinks = links.filter((l) =>
      l.getAttribute("href")?.startsWith("/portfolio/")
    );
    expect(portfolioLinks.length).toBeGreaterThan(0);
  });
});