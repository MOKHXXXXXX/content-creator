import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  contactSchema,
  contactEmailTemplate,
  autoReplyEmailTemplate,
  isContactRateLimited,
  isHoneypotTriggered,
  getClientIp,
} from "@/lib/contact";

const API_VERSION = "v2";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isContactRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, service, message, website, hpTime, interacted } =
      result.data;

    if (isHoneypotTriggered(website, hpTime, interacted)) {
      console.error("Contact form rejected as bot", {
        website,
        hpTime,
        interacted,
        email,
      });
      return NextResponse.json(
        { success: true, version: API_VERSION },
        { status: 200 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service is not configured. Contact site owner." },
        { status: 500 }
      );
    }

    if (!fromEmail || !toEmail) {
      return NextResponse.json(
        { error: "Email addresses are not configured. Contact site owner." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const notifyHtml = contactEmailTemplate({ name, email, service, message });

    let notifyId: string | undefined;

    try {
      const notifyResult = await resend.emails.send({
        from: `Portfolio Contact <${fromEmail}>`,
        to: [toEmail],
        replyTo: email,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service || "Not specified"}\n\nMessage:\n${message}`,
        html: notifyHtml,
      });

      if (notifyResult.error) {
        console.error("Resend notification error:", notifyResult.error);
        return NextResponse.json(
          { error: "Failed to send message. Please try again later." },
          { status: 500 }
        );
      }

      notifyId = notifyResult.data?.id;
    } catch (error) {
      console.error("Resend notification error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    const isSandboxSender = fromEmail
      .toLowerCase()
      .includes("onboarding@resend.dev");

    if (isSandboxSender) {
      console.error(
        "Skipping auto-reply: FROM_EMAIL uses the Resend sandbox, which can only deliver to your own verified address. Add and verify a domain in Resend to enable visitor auto-replies."
      );
    } else {
      try {
        await resend.emails.send({
          from: `Portfolio Contact <${fromEmail}>`,
          to: [email],
          subject: "Message received — I'll be in touch soon",
          text: `Hi ${name},\n\nThanks for reaching out. I've received your message and will get back to you within 1\u20132 business days.\n\nBest regards.`,
          html: autoReplyEmailTemplate(name),
        });
      } catch (error) {
        console.error("Resend auto-reply error:", error);
      }
    }

    return NextResponse.json(
      { success: true, messageId: notifyId, version: API_VERSION },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}