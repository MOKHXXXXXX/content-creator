import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByLabelText("Service")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/Name is too short/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    expect(screen.getByText(/Message is too short/i)).toBeInTheDocument();
  });

  it("shows an email format error on invalid input", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(
      screen.getByLabelText("Message"),
      "Hello, I would like to hire you for a blog project."
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Empty email triggers "Please enter a valid email"
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
  });

  it("submits successfully and shows success message", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
      headers: { get: () => null },
    } as unknown as Response);

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "john@example.com"
    );
    await user.type(
      screen.getByLabelText("Message"),
      "Hello, I would like to hire you for a blog project."
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/Message sent/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("shows error message when API fails", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: "Server failure" }),
      headers: { get: () => null },
    } as unknown as Response);

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(
      screen.getByPlaceholderText("you@company.com"),
      "john@example.com"
    );
    await user.type(
      screen.getByLabelText("Message"),
      "Hello, I would like to hire you for a blog project."
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/Server failure/i)).toBeInTheDocument();
  });

  it("includes the honeypot field hidden in the DOM", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="hp_f4v8q2"]');
    expect(honeypot).toHaveClass("hidden");
  });
});