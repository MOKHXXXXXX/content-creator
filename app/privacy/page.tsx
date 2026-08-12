import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description: `Privacy policy for ${site.name}.`,
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-paper py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-ink-60">
          <p>
            This privacy policy explains how information is collected, used,
            and protected when you use the contact form on this website.
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink">
            Information we collect
          </h2>
          <p>
            When you submit the contact form, we collect your name, email
            address, the service you are interested in, and your message. This
            information is sent directly via email.
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink">
            How we use your information
          </h2>
          <p>
            We use the information you provide solely to respond to your
            inquiry. We do not sell, rent, or share your personal information
            with third parties for marketing purposes.
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink">
            Data retention
          </h2>
          <p>
            Messages are retained in email correspondence for as long as
            necessary to fulfill your request or comply with legal obligations.
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink">
            Your rights
          </h2>
          <p>
            You have the right to request access to, correction of, or deletion
            of your personal information. To make such a request, please contact
            us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline underline-offset-4"
            >
              {site.email}
            </a>
            .
          </p>

          <h2 className="font-serif text-xl font-semibold text-ink">
            Changes to this policy
          </h2>
          <p>
            This policy may be updated occasionally. Any changes will be posted
            on this page.
          </p>

          <p className="pt-6 text-sm">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
        </div>
      </div>
    </main>
  );
}
