import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/app/sections/Testimonials";

describe("Testimonials section", () => {
  it("renders the heading", () => {
    render(<Testimonials />);
    expect(screen.getByText(/What founders say/i)).toBeInTheDocument();
  });

  it("renders testimonial quotes", () => {
    render(<Testimonials />);
    expect(screen.getByText(/doesn't just write/i)).toBeInTheDocument();
    expect(screen.getByText(/highest-converting channel/i)).toBeInTheDocument();
    expect(screen.getByText(/converted at 4\.8%/i)).toBeInTheDocument();
  });

  it("renders testimonial names and roles", () => {
    render(<Testimonials />);
    expect(screen.getByText("Salma Adel")).toBeInTheDocument();
    expect(screen.getByText("Omar El-Sayed")).toBeInTheDocument();
    expect(screen.getByText("Nour Hassan")).toBeInTheDocument();
    expect(screen.getByText(/Head of Growth, StackFlow/i)).toBeInTheDocument();
  });
});
