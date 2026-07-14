import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Cloudflare security policy", () => {
  it("ships restrictive browser security headers", () => {
    const headers = readFileSync("public/_headers", "utf8");

    expect(headers).toContain("Content-Security-Policy:");
    expect(headers).toContain("default-src 'self'");
    expect(headers).toContain("object-src 'none'");
    expect(headers).toContain("base-uri 'self'");
    expect(headers).toContain("frame-ancestors 'none'");
    expect(headers).toContain("Strict-Transport-Security:");
    expect(headers).toContain("Permissions-Policy:");
    expect(headers).toContain("X-Content-Type-Options: nosniff");
    expect(headers).toContain(
      "Referrer-Policy: strict-origin-when-cross-origin",
    );
  });

  it("publishes a security contact with an expiry", () => {
    const securityTxt = readFileSync("public/.well-known/security.txt", "utf8");

    expect(securityTxt).toMatch(/^Contact: /m);
    expect(securityTxt).toMatch(/^Expires: /m);
    expect(securityTxt).toContain(
      "Canonical: https://repaso-ai.pages.dev/.well-known/security.txt",
    );
  });
});
