/**
 * @jest-environment node
 */

import { POST } from "@/app/api/contact/route";
import { resetContactRateLimit } from "@/lib/contact";
import { NextRequest } from "next/server";

jest.mock("resend", () => {
  const mockSend = jest.fn();
  return {
    Resend: jest.fn(() => ({ emails: { send: mockSend } })),
  };
});

import { Resend } from "resend";

function buildRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function buildRequestWithIp(body: unknown, ip: string): NextRequest {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetContactRateLimit();
    process.env.RESEND_API_KEY = "re_test";
    process.env.FROM_EMAIL = "from@test.com";
    process.env.TO_EMAIL = "to@test.com";

    const resendMock = Resend as jest.Mock;
    const mockSend = jest
      .fn()
      .mockResolvedValue({ data: { id: "msg_1" }, error: null });
    resendMock.mockReturnValue({ emails: { send: mockSend } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 for invalid form data", async () => {
    const req = buildRequest({ name: "" });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain("Invalid form data");
  });

  it("returns 200 for valid data with env vars set", async () => {
    const req = buildRequest({
      name: "John",
      email: "john@test.com",
      message: "Hello, I would like to hire you.",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.messageId).toBe("msg_1");
  });

  it("returns 429 after exceeding rate limits", async () => {
    const body = {
      name: "John",
      email: "john@test.com",
      message: "Hello, I would like to hire you.",
    };

    for (let i = 0; i < 5; i++) {
      const res = await POST(buildRequestWithIp(body, "1.1.1.1"));
      expect(res.status).toBe(200);
    }
    const res = await POST(buildRequestWithIp(body, "1.1.1.1"));
    expect(res.status).toBe(429);
  });

  it("returns 200 for honeypot-filled submissions", async () => {
    const req = buildRequest({
      name: "John",
      email: "john@test.com",
      message: "Hello, I would like to hire you.",
      website: "http://spam.com",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("returns 500 when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    const req = buildRequest({
      name: "John",
      email: "john@test.com",
      message: "Hello, I would like to hire you.",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toContain("not configured");
  });

  it("returns 500 when FROM_EMAIL is missing", async () => {
    delete process.env.FROM_EMAIL;
    const req = buildRequest({
      name: "John",
      email: "john@test.com",
      message: "Hello, I would like to hire you.",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});