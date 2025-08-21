export function getClientId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("portfolioClientId");
  if (!id) {
    id = crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
    localStorage.setItem("portfolioClientId", id);
  }
  return id;
}
