export type TerminalLine = {
  text: string;
  color?: string;
  delay?: number;
};

export const terminalLines: TerminalLine[] = [
  { text: "> pnpm run dev", color: "text-gray-300", delay: 500 },

  { text: "✔ Starting development server...", color: "text-green-400" },
  { text: "✔ Connecting to VPS (Ubuntu 22.04)...", color: "text-green-400" },
  { text: "✔ Nginx reverse proxy loaded", color: "text-green-400" },

  { text: "[info] PostgreSQL connected", color: "text-blue-400" },
  { text: "[info] Running migrations", color: "text-blue-400" },

  { text: "Detected services:", color: "text-gray-400" },
  { text: "  React · TypeScript · Tailwind CSS", color: "text-yellow-400" },
  { text: "  Node.js · Express · PostgreSQL", color: "text-yellow-400" },
  { text: "  VPS · Nginx · PM2", color: "text-yellow-400" },

  { text: "✔ Build successful in 2.8s", color: "text-green-400" },
  { text: "Local: http://localhost:3000", color: "text-purple-400" },
];
