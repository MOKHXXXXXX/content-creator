import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  service: z.string().optional(),
  message: z.string().min(10, "Message is too short").max(5000),
  website: z.string().optional(),
  hpTime: z.number().optional(),
});

export type ContactData = z.infer<typeof contactSchema>;

const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

export function isContactRateLimited(ip: string): boolean {
  const count = rateLimit.get(ip) || 0;
  if (count >= MAX_REQUESTS_PER_WINDOW) return true;
  rateLimit.set(ip, count + 1);
  setTimeout(() => {
    const current = rateLimit.get(ip) || 0;
    if (current <= 1) rateLimit.delete(ip);
    else rateLimit.set(ip, current - 1);
  }, RATE_LIMIT_WINDOW_MS);
  return false;
}

export function resetContactRateLimit(): void {
  rateLimit.clear();
}

const MIN_HUMAN_SUBMIT_SECONDS = 3;

export function isHoneypotTriggered(
  website?: string,
  hpTime?: number
): boolean {
  if (website && website.length > 0) return true;
  if (hpTime == null) return true;
  return hpTime < MIN_HUMAN_SUBMIT_SECONDS;
}

export function contactEmailTemplate(body: {
  name: string;
  email: string;
  service: string | undefined;
  message: string;
}): string {
  const { name, email, service, message } = body;
  const formattedMessage = message.replace(/\n/g, "<br />");
  const serviceDisplay = service || "Not specified";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Georgia,serif;background-color:#FBF6EC;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#FBF6EC">
<tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border:1px solid #EDE3CF;">

<tr><td style="padding:32px 40px;border-bottom:3px solid #C1392B;">
  <h1 style="margin:0;font-family:Georgia,serif;font-size:24px;color:#211E1B;line-height:1.2;">
    New message from ${name}
  </h1>
</td></tr>

<tr><td style="padding:32px 40px;">

  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
    <tr>
      <td style="padding:8px 0;font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#6B655C;width:80px;">From</td>
      <td style="padding:8px 0;font-size:16px;color:#211E1B;border-bottom:1px solid #EDE3CF;">${name}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#6B655C;">Email</td>
      <td style="padding:8px 0;font-size:16px;color:#211E1B;border-bottom:1px solid #EDE3CF;">${email}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#6B655C;">Service</td>
      <td style="padding:8px 0;font-size:16px;color:#211E1B;border-bottom:1px solid #EDE3CF;">${serviceDisplay}</td>
    </tr>
  </table>

  <div style="border-left:3px solid #C1392B;padding:16px 24px;margin:24px 0;background-color:#FBF6EC;">
    <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#6B655C;margin-bottom:12px;">Message</p>
    <p style="margin:0;font-size:16px;color:#211E1B;line-height:1.7;">${formattedMessage}</p>
  </div>

</td></tr>

<tr><td style="padding:24px 40px;border-top:1px solid #EDE3CF;">
  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#6B655C;">
    Sent via your content writer portfolio
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function autoReplyEmailTemplate(name: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Georgia,serif;background-color:#FBF6EC;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#FBF6EC">
<tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border:1px solid #EDE3CF;">

<tr><td style="padding:32px 40px;border-bottom:3px solid #C1392B;">
  <h1 style="margin:0;font-family:Georgia,serif;font-size:24px;color:#211E1B;">
    Thanks for reaching out, ${name}.
  </h1>
</td></tr>

<tr><td style="padding:32px 40px;">
  <p style="margin:0 0 16px 0;font-size:16px;color:#211E1B;line-height:1.7;">
    I've received your message and will get back to you within 1\u20132 business days.
  </p>
  <p style="margin:0;font-size:14px;color:#6B655C;line-height:1.7;">
    In the meantime, feel free to browse my portfolio or connect on LinkedIn.
  </p>
</td></tr>

<tr><td style="padding:24px 40px;border-top:1px solid #EDE3CF;">
  <p style="margin:0;font-family:'Courier New',monospace;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#6B655C;">
    This is an automated confirmation.
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function getClientIp(request: {
  headers: { get(name: string): string | null };
}): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
}