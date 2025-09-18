export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[--surface] text-[--foreground]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm opacity-70">© {new Date().getFullYear()} BG Remover</p>
          <div className="flex items-center gap-4 text-sm opacity-80">
            <a href="#" className="hover:opacity-100 underline-offset-4 hover:underline">
              Twitter
            </a>
            <a href="#" className="hover:opacity-100 underline-offset-4 hover:underline">
              GitHub
            </a>
            <a href="#" className="hover:opacity-100 underline-offset-4 hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}



