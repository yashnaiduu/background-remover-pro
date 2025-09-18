"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass soft-shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            BG Remover
          </Link>
          <nav className="hidden gap-6 sm:flex">
            <Link href="#features" className="opacity-80 hover:opacity-100">
              Features
            </Link>
            <Link href="#pricing" className="opacity-80 hover:opacity-100">
              Pricing
            </Link>
            <Link href="#about" className="opacity-80 hover:opacity-100">
              About
            </Link>
            <Link href="#contact" className="opacity-80 hover:opacity-100">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}



