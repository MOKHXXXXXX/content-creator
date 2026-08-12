import { render, screen } from "@testing-library/react";
import { Hero } from "@/app/sections/Hero";

describe("Hero", () => {
  it("renders the meta label and headline", () => {
    render(<Hero />);
    expect(screen.getByText(/Content Writer for Startups/i)).toBeInTheDocument();
    expect(screen.getByText("I write")).toBeInTheDocument();
  });

  it("renders both CTA buttons", () => {
    render(<Hero />);
    const startProject = screen.getByRole("link", {
      name: /Start a project/i,
    });
    const browseWork = screen.getByRole("link", {
      name: /Browse work/i,
    });
    expect(startProject).toHaveAttribute("href", "#contact");
    expect(browseWork).toHaveAttribute("href", "#portfolio");
  });

  it("renders the subheadline", () => {
    render(<Hero />);
    expect(
      screen.getByText(/I help startups and marketing teams/i)
    ).toBeInTheDocument();
  });
});
