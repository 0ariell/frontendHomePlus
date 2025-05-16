// src/services/api.ts

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default async function apiPost(path: string, body: any) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function apiGet(path: string) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}
