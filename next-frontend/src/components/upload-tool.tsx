"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, ImageIcon, Loader2, Download } from "lucide-react";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function UploadTool() {
  const [dragActive, setDragActive] = useState(false);
  const [inputDataUrl, setInputDataUrl] = useState<string | null>(null);
  const [outputDataUrl, setOutputDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFiles = useCallback(async (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    setError(null);
    setOutputDataUrl(null);
    const dataUrl = await fileToDataUrl(file);
    setInputDataUrl(dataUrl);
    setIsLoading(true);
    try {
      const res = await fetch("/api/remove_background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl, format: "PNG" }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const json = (await res.json()) as { success?: boolean; image?: string; error?: string };
      if (!json.image) throw new Error(json.error || "No image returned");
      setOutputDataUrl(json.image);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      onFiles(e.dataTransfer.files);
    },
    [onFiles]
  );

  const borderClass = useMemo(
    () =>
      dragActive
        ? "border-transparent bg-gradient-to-r from-[--primary]/20 to-[--secondary]/20"
        : "border-white/15",
    [dragActive]
  );

  return (
    <div className="glass rounded-2xl p-6 soft-shadow">
      <h2 className="text-2xl font-semibold tracking-tight">Background Remover</h2>
      <p className="mt-2 opacity-80">Drag & drop an image or click to upload.</p>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`mt-6 block cursor-pointer rounded-xl border ${borderClass} p-8 text-center transition-colors`}
      >
        <div className="mx-auto flex max-w-md flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: dragActive ? 1.05 : 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <div className="gradient-border rounded-2xl p-4">
              <div className="rounded-xl bg-[--surface] p-4">
                <Upload className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
          <div>
            <p className="text-sm font-medium">Drop your image here</p>
            <p className="text-xs opacity-70">PNG, JPG, WebP up to ~10MB</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-white/5"
          >
            Choose file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
        </div>
      </label>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Preview */}
      {(inputDataUrl || outputDataUrl) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm opacity-80">
              <ImageIcon className="h-4 w-4" /> Original
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={inputDataUrl ?? ""} alt="Original" className="block max-h-[360px] w-full object-contain bg-black/5 dark:bg-white/5" />
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm opacity-80">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />} Result
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={outputDataUrl ?? ""} alt="Result" className="block max-h-[360px] w-full object-contain bg-transparent" />
            </div>
            {outputDataUrl && (
              <a
                href={outputDataUrl}
                download="background-removed.png"
                className="mt-3 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-white/5"
              >
                <Download className="h-4 w-4" /> Download PNG
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
