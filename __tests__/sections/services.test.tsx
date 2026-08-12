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
    expect(screen.getByText("Copywriting")).toBeInTheDocument();
    expect(screen.getByText("Blog Posts")).toBeInTheDocument();
    expect(screen.getByText("SEO Content")).toBeInTheDocument();
    expect(screen.getByText("Social Media Captions")).toBeInTheDocument();
    expect(screen.getByText("Email Newsletters")).toBeInTheDocument();
    expect(screen.getByText("Website Content")).toBeInTheDocument();
  });

  it("renders category tags for each service", () => {
    render(<Services />);
    expect(screen.getByText("COPY")).toBeInTheDocument();
    expect(screen.getByText("BLOG")).toBeInTheDocument();
    expect(screen.getByText("SEO")).toBeInTheDocument();
    expect(screen.getByText("SOCIAL")).toBeInTheDocument();
    expect(screen.getByText("EMAIL")).toBeInTheDocument();
    expect(screen.getByText("WEB")).toBeInTheDocument();
  });
});