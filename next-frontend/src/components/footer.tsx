export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[color-mix(in_oklab,var(--surface)_85%,transparent)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <div className="inline-flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded-md" style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))" }} />
              <span className="font-semibold">Background Remover</span>
            </div>
            <p className="mt-2 text-sm opacity-70">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <nav className="flex items-center justify-center gap-6 text-sm opacity-80 sm:col-span-1">
            <a href="#pricing" className="hover:opacity-100 hover:underline hover:underline-offset-4">Pricing</a>
            <a href="#about" className="hover:opacity-100 hover:underline hover:underline-offset-4">About</a>
            <a href="#contact" className="hover:opacity-100 hover:underline hover:underline-offset-4">Contact</a>
          </nav>
          <div className="flex items-center justify-end gap-4 sm:col-span-1">
            <a href="https://github.com/yashnaiduu/background-remover-pro" target="_blank" rel="noreferrer" className="opacity-80 transition hover:opacity-100">GitHub</a>
            <a href="#" className="opacity-80 transition hover:opacity-100">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}



