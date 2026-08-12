import { contactSchema } from "@/lib/contact";

describe("contactSchema", () => {
  it("validates a correct submission", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      service: "Copywriting",
      message: "Hello, I would like to hire you for a project.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a short name", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "john@example.com",
      message: "Hello, I would like to hire you.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "bad-email",
      message: "Hello, I would like to hire you.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a short message", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("allows optional website (honeypot) field", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello, I would like to hire you.",
      website: "spambot-filled",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a message longer than 5000 chars", () => {
    const result = contactSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      message: "A".repeat(5001),
    });
    expect(result.success).toBe(false);
  });
});