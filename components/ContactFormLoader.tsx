"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { FormSkeleton } from "@/components/FormSkeleton";

const ContactForm = dynamic(
  () =>
    new Promise<{ default: ComponentType }>((resolve) =>
      setTimeout(
        () =>
          import("@/components/ContactForm").then((m) =>
            resolve({ default: m.ContactForm })
          ),
        800
      )
    ),
  { loading: () => <FormSkeleton />, ssr: false }
);

export default function ContactFormLoader() {
  return <ContactForm />;
}
