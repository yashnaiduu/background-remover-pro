"use client";
import { motion } from "framer-motion";
import { UploadTool } from "@/components/upload-tool";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Remove backgrounds with pixel-perfect quality
              </h1>
              <p className="mt-4 max-w-prose text-balance opacity-80">
                World-class AI background removal. Drag & drop your image and get a clean, transparent result in seconds.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#tool"
                  className="gradient-border rounded-xl px-6 py-3 text-sm font-semibold text-[--foreground]"
                >
                  <span className="relative z-10 block rounded-[calc(theme(borderRadius.xl)-2px)] bg-[--surface] px-6 py-3">Upload an image</span>
                </a>
                <a href="#pricing" className="rounded-xl border px-6 py-3 text-sm opacity-90 hover:opacity-100">
                  View pricing
                </a>
              </div>
            </div>
            <div className="glass rounded-2xl p-4 soft-shadow">
              <div className="aspect-[16/10] w-full rounded-lg bg-gradient-to-br from-[--surface] to-transparent" />
            </div>
          </div>
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-80 w-80 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2 }}
          style={{ background: "radial-gradient(closest-side, var(--primary), transparent)" }}
        />
      </section>

      {/* Tool placeholder */}
      <section id="tool" className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
        <UploadTool />
      </section>

      {/* Pricing placeholder */}
      <section id="pricing" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
        <p className="mt-2 opacity-80">World-class SaaS style cards coming next.</p>
      </section>

      {/* About placeholder */}
      <section id="about" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">About</h2>
        <p className="mt-2 opacity-80">Modern storytelling with scroll animations coming next.</p>
      </section>

      {/* Contact placeholder */}
      <section id="contact" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 opacity-80">Form with floating labels and glowing borders coming next.</p>
      </section>
    </main>
  );
}
