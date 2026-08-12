import { render, screen } from "@testing-library/react";
import { Hero } from "@/app/sections/Hero";

describe("Hero", () => {
  it("renders the meta label and headline", () => {
    render(<Hero />);
    expect(screen.getByText(/Content Writer for Startups/i)).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("I write");
    expect(heading).toHaveTextContent("copy that converts");
    expect(heading).toHaveTextContent("for growing brands.");
  });

  it("renders both CTA buttons", () => {
    render(<Hero />);
    const startProject = screen.getByRole("link", {
      name: /Start a project/i,
    });
    const viewWork = screen.getByRole("link", {
      name: /View work/i,
    });
    expect(startProject).toHaveAttribute("href", "#contact");
    expect(viewWork).toHaveAttribute("href", "#portfolio");
  });

  it("renders the subheadline", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Content writer for B2B SaaS startups/i)
    ).toBeInTheDocument();
  });
});
