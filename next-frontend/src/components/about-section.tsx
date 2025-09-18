import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight">Crafted for creators</h2>
          <p className="mt-4 opacity-80">
            We obsess over pixels so you don’t have to. Our mission is to make high‑quality
            background removal fast, delightful, and accessible to everyone — whether you’re
            a seller, designer, or developer.
          </p>
          <blockquote className="mt-6 rounded-xl border border-white/10 p-4 text-lg">
            “Simplicity is the ultimate sophistication.”
          </blockquote>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 soft-shadow"
        >
          <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-[--surface] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}


