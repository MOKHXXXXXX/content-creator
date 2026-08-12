import { render, screen } from "@testing-library/react";
import { Services } from "@/app/sections/Services";

describe("Services section", () => {
  it("renders the heading", () => {
    render(<Services />);
    expect(
      screen.getByText(/What I can write for you/i)
    ).toBeInTheDocument();
  });

  it("renders all service cards", () => {
    render(<Services />);
    expect(screen.getByText("Blog & SEO Content")).toBeInTheDocument();
    expect(screen.getByText("Landing Page Copy")).toBeInTheDocument();
    expect(screen.getByText("Email Sequences")).toBeInTheDocument();
    expect(screen.getByText("Case Studies")).toBeInTheDocument();
    expect(screen.getByText("Social & Launch Content")).toBeInTheDocument();
  });

  it("renders category tags for each service", () => {
    render(<Services />);
    expect(screen.getByText("BLOG")).toBeInTheDocument();
    expect(screen.getByText("COPY")).toBeInTheDocument();
    expect(screen.getByText("EMAIL")).toBeInTheDocument();
    expect(screen.getByText("CASE")).toBeInTheDocument();
    expect(screen.getByText("SOCIAL")).toBeInTheDocument();
  });
});
