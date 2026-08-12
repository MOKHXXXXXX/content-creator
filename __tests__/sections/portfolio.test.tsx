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
    expect(screen.getAllByText("BLOG").length).toBeGreaterThan(0);
    expect(screen.getAllByText("COPY").length).toBeGreaterThan(0);
    expect(screen.getAllByText("EMAIL").length).toBeGreaterThan(0);
  });

  it("renders portfolio cards with titles", () => {
    render(<Portfolio />);
    expect(
      screen.getByText("How We Cut Activation Time by 40% Without Adding Features")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Converting Landing Page Copy for a Fintech Product Launch")
    ).toBeInTheDocument();
    expect(
      screen.getByText("From 0 to 10K Beta Users: A Launch Email Sequence")
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Complete Guide to Product-Led SEO for Early-Stage Startups")
    ).toBeInTheDocument();
  });

  it("renders word count and read time metadata", () => {
    render(<Portfolio />);
    expect(screen.getByText(/2,100 words/i)).toBeInTheDocument();
    expect(screen.getByText(/9 min read/i)).toBeInTheDocument();
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
