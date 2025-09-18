"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-transparent">
      <div className="border-b border-white/10 bg-[color-mix(in_oklab,var(--surface)_65%,transparent)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-md" style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }} />
              <span className="font-semibold tracking-tight">Background Remover</span>
            </Link>
            <nav className="hidden items-center gap-6 sm:flex">
              <Link href="#pricing" className="opacity-80 transition hover:opacity-100 hover:underline hover:underline-offset-4">
                Pricing
              </Link>
              <Link href="#about" className="opacity-80 transition hover:opacity-100 hover:underline hover:underline-offset-4">
                About
              </Link>
              <Link href="#contact" className="opacity-80 transition hover:opacity-100 hover:underline hover:underline-offset-4">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="#tool" className="hidden sm:inline-block rounded-xl text-sm font-medium gradient-border">
                <span className="relative z-10 block rounded-[calc(theme(borderRadius.xl)-2px)] bg-[--surface] px-4 py-2">Try Free</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



