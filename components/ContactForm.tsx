"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const FORM_LOADED_AT = Date.now();

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Please enter a valid email"),
  service: z.string().optional(),
  message: z.string().min(10, "Message is too short").max(5000),
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  { value: "", label: "Select a service (optional)" },
  { value: "Blog & SEO Content", label: "Blog & SEO Content" },
  { value: "Landing Page Copy", label: "Landing Page Copy" },
  { value: "Email Sequences", label: "Email Sequences" },
  { value: "Case Studies", label: "Case Studies" },
  { value: "Social & Launch Content", label: "Social & Launch Content" },
  { value: "Other", label: "Other" },
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = await trigger();
    if (!isValid) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const data = getValues();
      const honeypot =
        (
          document.querySelector<HTMLInputElement>(
            'input[name="hp_f4v8q2"]'
          )?.value || ""
        ).trim();
      const hpTime = Math.max(
        0,
        Math.round((Date.now() - FORM_LOADED_AT) / 1000)
      );

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot, hpTime }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 border border-accent-green/30 bg-accent-green/5 p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-green">
          Message sent ✓
        </div>
        <p className="text-sm text-text/70">
          Thanks for reaching out. I&apos;ll get back to you within 1–2 business
          days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs uppercase tracking-[0.06em] text-accent underline underline-offset-4 hover:text-accent/80"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full border-0 border-b border-border bg-transparent py-2 text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-2 font-mono text-[10px] text-accent">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full border-0 border-b border-border bg-transparent py-2 text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none"
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="mt-2 font-mono text-[10px] text-accent">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted"
        >
          Service
        </label>
        <select
          id="service"
          {...register("service")}
          className="w-full border-0 border-b border-border bg-transparent py-2 text-text focus:border-accent focus:outline-none"
        >
          {services.map((service) => (
            <option
              key={service.value}
              value={service.value}
              className="bg-surface text-text"
            >
              {service.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="w-full resize-none border-0 border-b border-border bg-transparent py-2 text-text placeholder:text-text-muted/40 focus:border-accent focus:outline-none"
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p className="mt-2 font-mono text-[10px] text-accent">
            {errors.message.message}
          </p>
        )}
      </div>

      <input
        type="text"
        name="hp_f4v8q2"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {status === "error" && (
        <p className="font-mono text-[10px] text-accent">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 border border-accent bg-accent px-8 py-3 font-mono text-sm font-medium uppercase tracking-[0.06em] text-bg transition-colors hover:bg-accent/90 disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send message →"
        )}
      </button>
    </form>
  );
}
