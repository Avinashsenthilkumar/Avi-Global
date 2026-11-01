"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

const PROJECT_TYPES = [
  "Website",
  "E-commerce",
  "Web Application",
  "Mobile Application",
  "Custom Software",
  "UI/UX Design",
  "Maintenance",
  "Other",
];

// Floating-label field. The label sits inside the input like a placeholder
// and glides up when the field is focused or filled.
function Field({ id, label, required, as = "input", ...props }) {
  const Tag = as;
  return (
    <div className="group relative">
      <Tag
        id={id}
        name={id}
        required={required}
        placeholder=" "
        className={`peer w-full rounded-2xl border border-graphite/15 bg-white px-4 pb-2.5 pt-6 text-[15px] text-graphite outline-none transition-[border-color,box-shadow] duration-300 focus:border-ember focus:shadow-[0_0_0_4px_rgba(232,93,16,0.12)] ${
          as === "textarea" ? "min-h-[150px] resize-none" : ""
        }`}
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-[18px] origin-left text-[15px] text-steel transition-all duration-300 ease-out peer-focus:top-2.5 peer-focus:scale-[0.78] peer-focus:text-ember peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:scale-[0.78]"
      >
        {label}
        {required && <span className="text-ember"> *</span>}
      </label>
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[460px] flex-col items-center justify-center rounded-[2rem] border border-graphite/10 bg-white p-10 text-center animate-[pageIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
        <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden="true">
          <circle cx="26" cy="26" r="24" fill="none" stroke="#E85D10" strokeWidth="2" strokeDasharray="151" strokeDashoffset="151" className="animate-[dash_0.8s_ease-out_forwards]" />
          <path d="M15 27l7 7 15-15" fill="none" stroke="#E85D10" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="40" className="animate-[dash_0.5s_0.6s_ease-out_forwards]" />
        </svg>
        <h3 className="mt-8 font-display text-3xl uppercase">Enquiry sent</h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-steel">
          Thank you, {form.name.split(" ")[0] || "there"}. We&apos;ve received your project enquiry and will get back to you shortly.
        </p>
        <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" required autoComplete="name" value={form.name} onChange={update("name")} />
        <Field id="company" label="Company" autoComplete="organization" value={form.company} onChange={update("company")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="email" type="email" label="Email" required autoComplete="email" inputMode="email" value={form.email} onChange={update("email")} />
        <Field id="phone" type="tel" label="Phone" autoComplete="tel" inputMode="tel" value={form.phone} onChange={update("phone")} />
      </div>

      <fieldset className="rounded-2xl border border-graphite/15 bg-white p-4">
        <legend className="px-1 text-[13px] text-steel">
          Project type <span className="text-ember">*</span>
        </legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t, i) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={t}
                required={i === 0}
                checked={form.projectType === t}
                onChange={update("projectType")}
                className="peer sr-only"
              />
              <span
                data-cursor="hover"
                className="inline-block rounded-full border border-graphite/15 px-4 py-2 text-[13px] transition-all duration-300 peer-checked:border-graphite peer-checked:bg-graphite peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ember hover:border-graphite/40"
              >
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="budget" label="Budget range" value={form.budget} onChange={update("budget")} />
      <Field id="message" as="textarea" label="Tell us about your project" required value={form.message} onChange={update("message")} />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          data-cursor="hover"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-graphite px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send project enquiry
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ember-gradient transition-transform duration-500 group-hover:-rotate-45">→</span>
            </>
          )}
        </button>
        <p className="text-xs text-steel">Fields marked <span className="text-ember">*</span> are required.</p>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          The enquiry didn&apos;t send. Please try again, or message us on{" "}
          <a className="underline" href={`https://wa.me/${siteConfig.phoneRaw}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      )}
    </form>
  );
}
