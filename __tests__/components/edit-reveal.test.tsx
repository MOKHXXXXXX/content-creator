import { render, screen } from "@testing-library/react";
import { TerminalReveal } from "@/components/ui/TerminalReveal";

describe("TerminalReveal", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders prefix, first phrase, and suffix", () => {
    render(
      <TerminalReveal
        prefix="I write"
        firstPhrase="nice words"
        finalPhrase="copy that converts"
        suffix="for growing brands."
      />
    );

    expect(screen.getByText("I write")).toBeInTheDocument();
    expect(screen.getByText(/for growing brands\./)).toBeInTheDocument();
  });

  it("types the first phrase then reveals the final phrase after animation", () => {
    render(
      <TerminalReveal
        prefix="I write"
        firstPhrase="nice words"
        finalPhrase="copy that converts"
        suffix="for growing brands."
      />
    );

    expect(screen.getByText(/I write/)).toBeInTheDocument();
    expect(screen.getByText(/for growing brands\./)).toBeInTheDocument();
  });
});
