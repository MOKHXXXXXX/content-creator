"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

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
  { value: "Copywriting", label: "Copywriting" },
  { value: "Blog Posts", label: "Blog Posts" },
  { value: "SEO Content", label: "SEO Content" },
  { value: "Social Media", label: "Social Media" },
  { value: "Email Newsletters", label: "Email Newsletters" },
  { value: "Website Content", label: "Website Content" },
  { value: "Other", label: "Other" },
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-3 text-paper">
          <CheckCircle className="h-6 w-6" />
          <span className="font-serif text-xl font-semibold">
            Message sent
          </span>
        </div>
        <p className="text-paper/80">
          Thanks for reaching out. I'll get back to you within 1–2 business
          days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 font-mono text-xs uppercase tracking-[0.06em] text-paper underline underline-offset-4 hover:text-sand"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.06em] text-paper/60"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full border-0 border-b border-paper/30 bg-transparent py-2 text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="mt-2 font-mono text-[10px] text-pen">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.06em] text-paper/60"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full border-0 border-b border-paper/30 bg-transparent py-2 text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none"
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="mt-2 font-mono text-[10px] text-pen">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.06em] text-paper/60"
        >
          Service
        </label>
        <select
          id="service"
          {...register("service")}
          className="w-full border-0 border-b border-paper/30 bg-transparent py-2 text-paper focus:border-paper focus:outline-none"
        >
          {services.map((service) => (
            <option
              key={service.value}
              value={service.value}
              className="bg-moss text-paper"
            >
              {service.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.06em] text-paper/60"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="w-full resize-none border-0 border-b border-paper/30 bg-transparent py-2 text-paper placeholder:text-paper/30 focus:border-paper focus:outline-none"
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p className="mt-2 font-mono text-[10px] text-pen">
            {errors.message.message}
          </p>
        )}
      </div>

      <input
        type="text"
        {...register("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {status === "error" && (
        <p className="font-mono text-[10px] text-pen">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 bg-paper px-8 py-3 font-mono text-xs font-medium uppercase tracking-[0.06em] text-moss transition-colors hover:bg-sand disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
