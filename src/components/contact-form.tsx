"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const topics = ["Membership enquiry", "Find a supplier", "Partnership", "Media", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "Please enter a valid email address.";
    if ((data.message ?? "").trim().length < 10) next.message = "Please write at least a short message.";
    if (!data.consent) next.consent = "Please agree so we can reply to you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-leaf-400 bg-leaf-50 p-10 text-center">
        <CheckCircle2 className="mx-auto size-12 text-leaf-500" aria-hidden />
        <p className="mt-4 font-display text-3xl font-semibold text-forest-900">Message sent</p>
        <p className="mx-auto mt-2 max-w-md text-muted">Thank you. The ESA secretariat aims to reply within 3 working days.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-bold">
          Send another message
        </button>
      </div>
    );
  }

  const field = "h-12 w-full rounded-xl border bg-white px-4 text-ink focus:border-leaf-500";
  const err = (k: string) =>
    errors[k] && (
      <p id={`${k}-err`} className="mt-1.5 text-sm font-semibold text-[#b03a1a]">
        {errors[k]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-line bg-white p-6 shadow-lg shadow-forest-900/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink">
            Full name <span className="text-[#b03a1a]">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" className={`${field} ${errors.name ? "border-[#b03a1a]" : "border-line"}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink">
            Email <span className="text-[#b03a1a]">*</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={`${field} ${errors.email ? "border-[#b03a1a]" : "border-line"}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="org" className="mb-1.5 block text-sm font-bold text-ink">
            Organisation
          </label>
          <input id="org" name="organisation" autoComplete="organization" className={`${field} border-line`} />
        </div>
        <div>
          <label htmlFor="topic" className="mb-1.5 block text-sm font-bold text-ink">
            Topic
          </label>
          <select id="topic" name="topic" className={`${field} border-line`}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink">
            Message <span className="text-[#b03a1a]">*</span>
          </label>
          <textarea id="message" name="message" rows={5} className={`w-full rounded-xl border bg-white p-4 text-ink focus:border-leaf-500 ${errors.message ? "border-[#b03a1a]" : "border-line"}`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
          {err("message")}
        </div>
        {/* Honeypot for spam (F9) */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" name="consent" className="mt-0.5 size-5 shrink-0 accent-forest-700" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
            <span>
              I agree that ESA may use these details to reply to my message, as described in the{" "}
              <a href="/privacy" className="font-semibold text-forest-700 underline underline-offset-2">privacy notice</a>.
            </span>
          </label>
          {err("consent")}
        </div>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-5 rounded-xl bg-[#fde8e1] p-3 text-sm font-semibold text-[#8a2c12]">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-forest-900 px-6 font-bold text-cream transition hover:bg-forest-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
