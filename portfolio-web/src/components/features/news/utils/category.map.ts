export const CATEGORY_LABELS = [
  "Web Design",
  "Mobile Apps Design",
  "Brand Identity Design",
  "Motion Graphic Design",
  "Web Development",
  "Digital Marketing",
  "Artificial Intelligence",
] as const;

export type PortfolioCategory = (typeof CATEGORY_LABELS)[number];

const norm = (s: string) => s.trim().toLowerCase();

const TAG_TO_CATEGORY: Record<string, PortfolioCategory> = {
  // Web Design
  webdesign: "Web Design",
  "web-design": "Web Design",
  ux: "Web Design",
  ui: "Web Design",
  "ui/ux": "Web Design",
  uxdesign: "Web Design",
  uidesign: "Web Design",
  figma: "Web Design",
  sketch: "Web Design",
  "adobe-xd": "Web Design",
  responsive: "Web Design",
  accessibility: "Web Design",
  a11y: "Web Design",
  css: "Web Design",
  tailwindcss: "Web Design",

  // Mobile Apps Design
  "mobile-design": "Mobile Apps Design",
  mobileappsdesign: "Mobile Apps Design",
  swiftui: "Mobile Apps Design",
  ios: "Mobile Apps Design",
  android: "Mobile Apps Design",

  // Brand Identity Design
  branding: "Brand Identity Design",
  brand: "Brand Identity Design",
  "brand-identity": "Brand Identity Design",
  logo: "Brand Identity Design",
  typography: "Brand Identity Design",
  color: "Brand Identity Design",
  illustrator: "Brand Identity Design",

  // Motion Graphic Design
  motion: "Motion Graphic Design",
  "motion-graphics": "Motion Graphic Design",
  animation: "Motion Graphic Design",
  lottie: "Motion Graphic Design",
  aftereffects: "Motion Graphic Design",
  gsap: "Motion Graphic Design",
  "framer-motion": "Motion Graphic Design",

  // Web Development
  webdev: "Web Development",
  "web-development": "Web Development",
  javascript: "Web Development",
  typescript: "Web Development",
  react: "Web Development",
  nextjs: "Web Development",
  vue: "Web Development",
  svelte: "Web Development",
  astro: "Web Development",
  vite: "Web Development",
  node: "Web Development",
  nodejs: "Web Development",
  express: "Web Development",
  python: "Web Development",
  django: "Web Development",
  ruby: "Web Development",
  rails: "Web Development",
  php: "Web Development",
  laravel: "Web Development",

  // Digital Marketing
  marketing: "Digital Marketing",
  growth: "Digital Marketing",
  "growth-marketing": "Digital Marketing",
  seo: "Digital Marketing",
  sem: "Digital Marketing",
  analytics: "Digital Marketing",
  "google-analytics": "Digital Marketing",
  "social-media": "Digital Marketing",
  "content-marketing": "Digital Marketing",
  "email-marketing": "Digital Marketing",
  ads: "Digital Marketing",
  "google-ads": "Digital Marketing",
  "facebook-ads": "Digital Marketing",

  // Artificial Intelligence
  ai: "Artificial Intelligence",
  "artificial-intelligence": "Artificial Intelligence",
  machinelearning: "Artificial Intelligence",
  ml: "Artificial Intelligence",
  deeplearning: "Artificial Intelligence",
  nlp: "Artificial Intelligence",
  "computer-vision": "Artificial Intelligence",
  "generative-ai": "Artificial Intelligence",
  gpt: "Artificial Intelligence",
  openai: "Artificial Intelligence",
  huggingface: "Artificial Intelligence",
  transformers: "Artificial Intelligence",
};

const TITLE_KEYWORDS: Array<[RegExp, PortfolioCategory]> = [
  [
    /\b(ux|ui|wireframe|mockup|responsive|accessibility|a11y|figma|sketch|tailwind)\b/i,
    "Web Design",
  ],
  [/\b(mobile\s*(app)?\s*design|swiftui|ios|android)\b/i, "Mobile Apps Design"],
  [
    /\b(branding|brand\s*identity|logo|typograph(y|ía)|color\s*palette)\b/i,
    "Brand Identity Design",
  ],
  [
    /\b(motion\s*graphic|animation|after\s*effects|lottie|gsap|framer\s*motion)\b/i,
    "Motion Graphic Design",
  ],
  [
    /\b(frontend|backend|full\s*stack|api|framework|react|next\.?js|vue|svelte|node(\.js)?|express|django|laravel)\b/i,
    "Web Development",
  ],
  [
    /\b(seo|sem|analytics|marketing|growth|social\s*media|email\s*marketing|ads)\b/i,
    "Digital Marketing",
  ],
  [
    /\b(ai|machine\s*learning|deep\s*learning|nlp|llm|gpt|generative\s*ai|computer\s*vision)\b/i,
    "Artificial Intelligence",
  ],
];

export function mapToPortfolioCategories(
  tags: string[],
  title?: string
): PortfolioCategory[] {
  const found = new Set<PortfolioCategory>();
  for (const raw of tags) {
    const t = norm(raw);
    const cat = TAG_TO_CATEGORY[t];
    if (cat) found.add(cat);
  }
  if (title && found.size === 0) {
    for (const [re, cat] of TITLE_KEYWORDS) {
      if (re.test(title)) found.add(cat);
    }
  }
  return [...found];
}
