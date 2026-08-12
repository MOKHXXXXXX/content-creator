import { render } from "@testing-library/react";
import { Icon } from "@/components/icon";

describe("Icon component", () => {
  it("renders a known Lucide icon", () => {
    const { container } = render(<Icon name="Mail" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the LinkedIn custom SVG", () => {
    const { container } = render(<Icon name="Linkedin" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("renders the Twitter custom SVG", () => {
    const { container } = render(<Icon name="Twitter" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("returns null for unknown icon names", () => {
    const { container } = render(<Icon name="NotAnIcon" />);
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("passes className to the icon", () => {
    const { container } = render(<Icon name="Mail" className="h-5 w-5" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("h-5");
    expect(svg).toHaveClass("w-5");
  });
});