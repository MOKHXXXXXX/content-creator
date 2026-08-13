import { render, screen } from "@testing-library/react";

jest.mock("@/components/ContactFormLoader", () => ({
  __esModule: true,
  default: () => {
    const { ContactForm } = jest.requireActual("@/components/ContactForm");
    return <ContactForm />;
  },
}));

import { Contact } from "@/app/sections/Contact";

describe("Contact section", () => {
  it("renders the heading", () => {
    render(<Contact />);
    expect(
      screen.getByText("Let's work together.")
    ).toBeInTheDocument();
  });

  it("renders the email link", () => {
    render(<Contact />);
    const emailLink = screen.getByText(/moktarmoha17@gmail.com/i);
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:moktarmoha17@gmail.com"
    );
  });

  it("renders social media icons", () => {
    render(<Contact />);
    const linkedin = screen.getByLabelText("LinkedIn");
    const twitter = screen.getByLabelText("Twitter");
    const medium = screen.getByLabelText("Medium");
    expect(linkedin).toBeInTheDocument();
    expect(twitter).toBeInTheDocument();
    expect(medium).toBeInTheDocument();
  });

  it("renders the contact form", () => {
    render(<Contact />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@company.com/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("has the correct section id", () => {
    render(<Contact />);
    expect(document.getElementById("contact")).toBeInTheDocument();
  });
});