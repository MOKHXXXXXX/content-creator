import { render, screen } from "@testing-library/react";
import { EditReveal } from "@/components/ui/EditReveal";

describe("EditReveal", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders prefix, first phrase, and suffix", () => {
    render(
      <EditReveal
        prefix="I write"
        firstPhrase="nice words"
        finalPhrase="copy that converts"
        suffix="for growing brands."
      />
    );

    expect(screen.getByText(/I write/)).toBeInTheDocument();
    expect(screen.getByText("nice words")).toBeInTheDocument();
    expect(screen.getByText(/for growing brands\./)).toBeInTheDocument();
  });

  it("hides the first phrase and reveals the final phrase after animation", () => {
    // matchMedia returns matches: false so reduced motion is off
    render(
      <EditReveal
        prefix="I write"
        firstPhrase="nice words"
        finalPhrase="copy that converts"
        suffix="for growing brands."
      />
    );

    expect(screen.getByText("nice words")).toBeInTheDocument();
    expect(
      screen.getByText("copy that converts")
    ).not.toBeVisible();

    jest.advanceTimersByTime(700); // trigger strike phase
    jest.advanceTimersByTime(700); // trigger reveal phase

    // After reveal the first phrase fades out (opacity 0, still in DOM)
    // and the final phrase fades in
    expect(screen.queryByText("copy that converts")).toBeInTheDocument();
  });
});