export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export async function postRemoveBackground(payload: any) {
  const res = await fetch(`${API_BASE}/api/remove_background`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

