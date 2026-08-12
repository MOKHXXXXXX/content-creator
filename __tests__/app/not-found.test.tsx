import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("404 page", () => {
  it("renders the 404 label and heading", () => {
    render(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(
      screen.getByText("This page doesn't exist.")
    ).toBeInTheDocument();
  });

  it("renders a link back to home", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: /return to homepage/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders a descriptive subtitle", () => {
    render(<NotFound />);
    expect(
      screen.getByText(/It may have been moved, deleted, or never written/i)
    ).toBeInTheDocument();
  });
});