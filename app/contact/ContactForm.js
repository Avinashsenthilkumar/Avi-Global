"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

const inputClass =
  "w-full bg-transparent border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-muted/70 outline-none focus:border-gold transition-colors duration-300";

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

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

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
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/40 bg-ink-soft/40 p-10 text-center"
      >
        <h3 className="font-display font-medium uppercase text-2xl text-gold tracking-tight">
          Enquiry Sent
        </h3>
        <p className="mt-4 text-sm text-muted leading-relaxed max-w-md mx-auto">
          Thank you for reaching out. We&apos;ve received your project enquiry
          and will get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <input
          required
          placeholder="Name *"
          value={form.name}
          onChange={update("name")}
          className={inputClass}
        />
        <input
          placeholder="Company"
          value={form.company}
          onChange={update("company")}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <input
          required
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={update("email")}
          className={inputClass}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={update("phone")}
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <select
          required
          value={form.projectType}
          onChange={update("projectType")}
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled className="bg-ink">
            Project Type *
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
        <input
          placeholder="Budget Range"
          value={form.budget}
          onChange={update("budget")}
          className={inputClass}
        />
      </div>

      <textarea
        required
        rows={5}
        placeholder="Message *"
        value={form.message}
        onChange={update("message")}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        data-cursor-hover
        className="inline-flex items-center rounded-full bg-gold-gradient px-8 py-3.5 text-xs tracking-widest2 uppercase text-ink font-medium transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "submitting" ? "Sending..." : "Send Project Enquiry"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again, or reach us on WhatsApp.
        </p>
      )}
    </form>
  );
}
