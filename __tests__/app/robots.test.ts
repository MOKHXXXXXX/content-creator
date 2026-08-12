import robotsFn from "@/app/robots";

describe("robots.txt", () => {
  it("allows all user agents", () => {
    const result = robotsFn();
    expect(result.rules?.userAgent).toBe("*");
  });

  it("allows the root path", () => {
    const result = robotsFn();
    expect(result.rules?.allow).toBe("/");
  });

  it("disallows the API path", () => {
    const result = robotsFn();
    expect(result.rules?.disallow).toBe("/api/");
  });

  it("points to the sitemap", () => {
    const result = robotsFn();
    expect(result.sitemap).toBe(
      "https://youssef-writer.vercel.app/sitemap.xml"
    );
  });
});