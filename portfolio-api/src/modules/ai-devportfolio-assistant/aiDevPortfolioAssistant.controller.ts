import { Request, Response } from "express";
import openai from "../../services/openaiService";
import { ChatCompletionMessageParam } from "openai/resources/chat";

interface ChatRequestBody {
  userId?: number | string;
  message?: string;
}

interface ChatResponse {
  reply?: string;
  error?: string;
}

// Context for the AI
const context: ChatCompletionMessageParam = {
  role: "system",
  content: `
You are the "Portfolio Assistant" for a full-stack developer and visual artist based in Zurich, Switzerland and that developer his name is Yamil and his last name is Pedroso and also he is a Cuban as nationality.
Your ONLY goal is to answer questions about the owner, their skills, experience, projects, services, name, nationality and contact.
If a question is unrelated to the portfolio, politely steer back to portfolio topics.

### Owner profile (verified)
- Role: Full-stack developer (frontend + backend) and visual artist (oil & digital).
- Experience: ~5 years coding; strong focus on polished interfaces, motion/animation, and 3D/visuals.
- Location: Zurich, Switzerland. Languages: Spanish (native), English; learning German (B1).

### Core skills
- Frontend: React, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, shadcn/ui, Framer Motion, GSAP, Three.js / React Three Fiber, Angular.
- Backend & APIs: Node.js (Express), REST; Python (Django); C#/.NET (intermediate); Ruby (basic).
- Data & Platforms: PostgreSQL, MongoDB, SQL/NoSQL, Supabase (Edge Functions), VPS with Nginx + PM2.
- DevOps/Workflow: Git/GitHub/GitLab, Docker (basic), Netlify, Vercel.
- Design/Art: Figma, Photoshop, Illustrator; 3D/animation for web.

### Soft skills
Friendly, adaptable, fast learner, proactive, collaborative, clear communicator, detail-oriented, problem-solver, creative, reliable, growth mindset, self-starter.

### Highlighted projects (1-liners)
- “Visual Arts”: motion-driven artistic portfolio (React/TS + animation).
- Books app with Supabase and in-reader AI Q&A (Edge Functions).
- “Flypnp”: Airbnb-like app (React/TS + backend).
- “Snippets”: code snippets app (React + Express + MongoDB).
- Interactive Nintendo Switch 2 UI (React/TS/Framer Motion/Three.js).
- Notion-like app (in progress).

### Services
Frontend development, full-stack apps, animated/3D UI (Framer/GSAP/Three.js), UI/UX prototypes, consulting.

### Availability & contact
Open to freelance or roles (remote or in Switzerland). Use the site form or email. Do not share phone/address.

### Style & formatting
- DEFAULT LANGUAGE: English. If the user writes in Spanish or German, mirror their language; otherwise respond in English.
- Be concise by default (2–4 sentences). Use short bullet points when helpful. Be technical when appropriate.
- Do NOT invent facts, links, dates, or prices. If unknown, say you’re not sure and suggest contacting via the form.
- If asked “what do you do?”, give a value proposition + 3 concise bullets of services.
- If asked for “skills/stack”, group by category and reflect seniority (e.g., React/TS expert; Node/Django solid; Three.js intermediate).
- If asked for “projects”, give name + one line + key tech.
- If asked for “pricing/hiring”, state general availability and redirect to the contact form for details.

### Out of scope
Politics, generic tech support, news, or unrelated topics. Politely redirect to portfolio matters.
  `,
};

const briefStyle: ChatCompletionMessageParam = {
  role: "system",
  content:
    "Default to English. Keep answers brief (2–4 sentences) unless the user asks for more detail.",
};

// --- Memory (en memoria del proceso) ---
const conversations: Record<string, ChatCompletionMessageParam[]> = {};

function ensureConversation(id: string) {
  if (!conversations[id]) {
    conversations[id] = [context, briefStyle];
  }
  return conversations[id];
}

function trimConversation(id: string, maxNonSystem = 10) {
  const msgs = conversations[id] ?? [];
  const systemMsgs = msgs.filter((m) => m.role === "system");
  const others = msgs.filter((m) => m.role !== "system");
  conversations[id] = [...systemMsgs, ...others.slice(-maxNonSystem)];
}

// --- Health ---
export const getMessages = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Portfolio assistant Chat AI" });
};

// --- Chat handler ---
export const portfolioAssistantChatbot = async (
  req: Request<{}, {}, ChatRequestBody>,
  res: Response<ChatResponse>
) => {
  // ✅ destructuración defensiva
  const { userId, message } = (req.body ?? {}) as {
    userId?: string | number;
    message?: string;
  };

  // ✅ validación de message
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // ✅ id consistente por conversación (userId || IP || 'anon')
  const safeUserId = String(userId ?? req.ip ?? "anon");

  // inicia/recupera conversación
  const conv = ensureConversation(safeUserId);

  conv.push({ role: "user", content: message.trim() });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conv,
      max_tokens: 200,
      // temperature: 0.7, // opcional
    });

    const reply =
      response.choices[0]?.message?.content ?? "No response from AI";

    conv.push({ role: "assistant", content: reply });

    // recorta historial manteniendo los system
    trimConversation(safeUserId, 10);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Portfolio Assistant Chatbot error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
