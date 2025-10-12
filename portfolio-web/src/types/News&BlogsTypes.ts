export type ItemKind =
  | "news"
  | "blog"
  | "community"
  | "tutorial"
  | "release"
  | "research"
  | "opinion";

export type FeedItem = {
  id: string;
  title: string;
  url: string;
  image?: string | null;
  source: string;
  description?: string | null;
  kind: ItemKind;
  categories: string[];
  tags: string[];
  author?: string | null;
  authorAvatar?: string | null;
  publishedAt: Date | null;
  score?: number | null;
  fetchedAt: Date;
};

// helpers
const toDate = (s?: string | number | Date | null) =>
  !s ? null : s instanceof Date ? (isNaN(+s) ? null : s) : new Date(s);

// normalizador de tags que admite string | string[] | undefined
const toTags = (t?: string | string[] | null) =>
  Array.isArray(t)
    ? t.map((x) => x.trim()).filter(Boolean)
    : typeof t === "string"
      ? t
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      : [];

// --------- Mappers ----------
export type DevtoArticle = {
  id: number;
  title: string;
  url: string;
  cover_image?: string | null;
  social_image?: string | null;
  tag_list?: string[] | string | null;
  user?: { name?: string | null } | null;
  published_at?: string | null;
};

export function mapDevto(a: DevtoArticle): FeedItem {
  const tags = toTags(a.tag_list);
  return {
    id: `devto-${a.id}`,
    title: a.title,
    url: a.url,
    image: a.cover_image ?? a.social_image ?? null,
    source: "devto",
    kind: "blog",
    categories: [...tags], // o mapea a tu taxonomía si tienes una lista controlada
    tags,
    author: a.user?.name ?? null,
    publishedAt: toDate(a.published_at),
    score: null,
    fetchedAt: new Date(),
  };
}

export type HNHit = {
  objectID: string;
  title: string;
  url?: string | null;
  author?: string | null;
  created_at?: string | null;
  points?: number | null;
};

export function mapHN(hit: HNHit): FeedItem {
  const url = hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`;
  return {
    id: `hn-${hit.objectID}`,
    title: hit.title,
    url,
    image: null,
    source: "hn",
    kind: "community",
    categories: [], // si haces NLP/keywords, aquí
    tags: [], // HN no trae tags nativos
    author: hit.author ?? null,
    publishedAt: toDate(hit.created_at),
    score: hit.points ?? null,
    fetchedAt: new Date(),
  };
}

export type RSSEntry = {
  guid: string;
  title: string;
  link: string;
  enclosure?: { url?: string | null } | null;
  mediaContent?: { url?: string | null } | null;
  categories?: string[] | null;
  author?: string | null;
  isoDate?: string | null;
};

export function mapRSS(entry: RSSEntry): FeedItem {
  const tags = entry.categories ?? [];
  return {
    id: `rss-${entry.guid}`,
    title: entry.title,
    url: entry.link,
    image: entry.mediaContent?.url ?? entry.enclosure?.url ?? null,
    source: "techcrunch", // ajusta según el feed
    kind: "news",
    categories: [...tags],
    tags,
    author: entry.author ?? null,
    publishedAt: toDate(entry.isoDate),
    score: null,
    fetchedAt: new Date(),
  };
}
