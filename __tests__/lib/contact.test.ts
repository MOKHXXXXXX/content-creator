import {
  isContactRateLimited,
  resetContactRateLimit,
  getClientIp,
  contactEmailTemplate,
  autoReplyEmailTemplate,
} from "@/lib/contact";

describe("rate limiter", () => {
  beforeEach(() => {
    resetContactRateLimit();
  });

  it("allows the first request", () => {
    expect(isContactRateLimited("1.1.1.1")).toBe(false);
  });

  it("blocks after 5 requests", () => {
    for (let i = 0; i < 5; i++) {
      expect(isContactRateLimited("1.1.1.1")).toBe(false);
    }
    expect(isContactRateLimited("1.1.1.1")).toBe(true);
  });

  it("treats different IPs independently", () => {
    for (let i = 0; i < 5; i++) {
      isContactRateLimited("1.1.1.1");
    }
    expect(isContactRateLimited("1.1.1.1")).toBe(true);
    expect(isContactRateLimited("2.2.2.2")).toBe(false);
  });
});

describe("getClientIp", () => {
  it("reads x-forwarded-for header", () => {
    const ip = getClientIp({
      headers: {
        get: (name: string) =>
          name === "x-forwarded-for" ? "10.0.0.1, 20.0.0.2" : null,
      },
    });
    expect(ip).toBe("10.0.0.1");
  });

  it("falls back to x-real-ip", () => {
    const ip = getClientIp({
      headers: {
        get: (name: string) => (name === "x-real-ip" ? "10.0.0.5" : null),
      },
    });
    expect(ip).toBe("10.0.0.5");
  });

  it("falls back to anonymous", () => {
    const ip = getClientIp({
      headers: {
        get: () => null,
      },
    });
    expect(ip).toBe("anonymous");
  });
});

describe("email templates", () => {
  it("generates a notification email with name and service", () => {
    const html = contactEmailTemplate({
      name: "Jane",
      email: "jane@test.com",
      service: "Blog Posts",
      message: "Hello world",
    });
    expect(html).toContain("New message from Jane");
    expect(html).toContain("Blog Posts");
    expect(html).toContain("jane@test.com");
    expect(html).toContain("Hello world");
  });

  it("generates a notification email without optional service", () => {
    const html = contactEmailTemplate({
      name: "Jane",
      email: "jane@test.com",
      service: undefined,
      message: "Hello",
    });
    expect(html).toContain("Not specified");
  });

  it("generates an auto-reply email", () => {
    const html = autoReplyEmailTemplate("Jane");
    expect(html).toContain("Thanks for reaching out, Jane");
    expect(html).toContain("automated confirmation");
  });
});