import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/app/sections/Testimonials";

describe("Testimonials section", () => {
  it("renders the heading", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/Notes from the margins/i)
    ).toBeInTheDocument();
  });

  it("renders the philosophy quote", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/Good writing doesn't just fill space/i)
    ).toBeInTheDocument();
  });

  it("renders sample testimonial labels", () => {
    render(<Testimonials />);
    const sampleLabels = screen.getAllByText(/Sample testimonial/i);
    expect(sampleLabels.length).toBeGreaterThan(0);
  });

  it("renders testimonial client names in both desktop and mobile views", () => {
    render(<Testimonials />);
    // Client names appear both in desktop annotation cards and mobile carousel
    expect(screen.getAllByText("Priya Sharma").length).toBeGreaterThan(0);
    expect(screen.getAllByText("David Kim").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Lena Okafor").length).toBeGreaterThan(0);
  });

  it("renders navigation arrows on mobile", () => {
    render(<Testimonials />);
    expect(
      screen.getByLabelText(/Previous testimonial/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Next testimonial/i)
    ).toBeInTheDocument();
  });
});