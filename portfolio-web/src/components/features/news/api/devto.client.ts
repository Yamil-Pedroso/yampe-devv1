import { z } from "zod";

export const DevtoArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  description: z.string().nullable().optional(),
  cover_image: z.string().url().nullable().optional(),
  social_image: z.string().url().nullable().optional(),
  tag_list: z
    .union([z.array(z.string()), z.string()])
    .nullable()
    .optional(),
  published_at: z.string().datetime().nullable().optional(),
  body_markdown: z.string().nullable().optional(),
  user: z
    .object({
      name: z.string().nullable().optional(),
      profile_image: z.string().url().nullable().optional(),
      profile_image_90: z.string().url().nullable().optional(),
    })
    .nullable()
    .optional(),
  organization: z
    .object({
      name: z.string().nullable().optional(),
      profile_image: z.string().url().nullable().optional(),
      profile_image_90: z.string().url().nullable().optional(),
    })
    .nullable()
    .optional(),
});
export type DevtoArticle = z.infer<typeof DevtoArticleSchema>;

// GET /api/articles/{id}
export async function fetchDevtoArticleById(numericId: number) {
  const url = `https://dev.to/api/articles/${numericId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`DEV.to detail ${res.status}`);
  const raw = await res.json();
  return DevtoArticleSchema.parse(raw);
}

// --- Utils ---
const toDate = (v?: string | number | Date | null) => {
  if (!v) return null;
  if (v instanceof Date) return isNaN(+v) ? null : v;
  if (typeof v === "number") {
    const ms = v < 1e12 ? v * 1000 : v;
    const d = new Date(ms);
    return isNaN(+d) ? null : d;
  }
  const d = new Date(v);
  return isNaN(+d) ? null : d;
};

const toTags = (t?: string[] | string | null) =>
  Array.isArray(t)
    ? t.map((x) => x.trim()).filter(Boolean)
    : typeof t === "string"
      ? t
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      : [];

// --- Parámetros de consulta ---
export type DevtoQuery = {
  tag?: string; // p.ej. 'react'
  username?: string; // opcional: artículos de un usuario
  page?: number; // 1..n
  per_page?: number; // máx recomendado 30
};

// --- Cliente simple con timeout + validación ---
export async function fetchDevtoArticles(q: DevtoQuery = {}) {
  const { tag, username, page = 1, per_page = 12 } = q;

  const params = new URLSearchParams();
  params.set("per_page", String(per_page));
  params.set("page", String(page));
  if (tag) params.set("tag", tag);
  if (username) params.set("username", username);

  const url = `https://dev.to/api/articles?${params.toString()}`;

  console.log("DEV.to URL", url);

  // timeout para evitar colgar la UI
  const ctrl = new AbortController();
  const tid = setTimeout(() => ctrl.abort(), 10_000);

  let res: Response;
  try {
    res = await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(tid);
  }
  if (!res.ok) throw new Error(`DEV.to error ${res.status}`);

  const raw = await res.json();
  const parsed = z.array(DevtoArticleSchema).safeParse(raw);
  if (!parsed.success) {
    throw new Error("DEV.to: unexpected response");
  }

  console.log(
    "RAW DEVTO published_at",
    parsed.data.slice(0, 8).map((a) => a.published_at)
  );

  return parsed.data.map((a) => ({
    id: a.id,
    title: a.title,
    url: a.url,
    image: a.cover_image ?? a.social_image ?? null,
    description: a.description ?? null,
    source: "devto",
    body: a.body_markdown ?? null,
    kind: "blog" as const,
    tags: toTags(a.tag_list),
    author: a.user?.name ?? null,
    authorAvatar:
      a.user?.profile_image_90 ??
      a.user?.profile_image ??
      a.organization?.profile_image_90 ??
      a.organization?.profile_image ??
      null,
    publishedAt: toDate(a.published_at),
    score: null,
    fetchedAt: new Date(),
  }));
}
