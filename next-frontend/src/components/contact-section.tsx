"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  return (
    <section id="contact" className="mx-auto mt-24 max-w-3xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight text-center">Contact</h2>
      <p className="mt-2 text-center opacity-80">Questions, ideas, or feedback? We’d love to hear.</p>
      <motion.form
        onSubmit={onSubmit}
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mt-8 glass rounded-2xl p-6 soft-shadow"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="group">
            <label className="text-sm opacity-80">Name</label>
            <input className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:border-[--primary]" required />
          </div>
          <div className="group">
            <label className="text-sm opacity-80">Email</label>
            <input type="email" className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:border-[--primary]" required />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm opacity-80">Message</label>
            <textarea rows={5} className="mt-1 w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 outline-none focus:border-[--primary]" required />
          </div>
        </div>
        <button disabled={loading} className="mt-6 rounded-xl px-5 py-2 text-sm font-medium gradient-border">
          <span className="relative z-10 block rounded-[calc(theme(borderRadius.xl)-2px)] bg-[--surface] px-5 py-2">
            {loading ? "Sending…" : sent ? "Sent ✓" : "Send Message 🚀"}
          </span>
        </button>
      </motion.form>
    </section>
  );
}


