/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from "react";
import { Bot, Send, Loader2 } from "lucide-react";
import {
  useAssistantHealth,
  useAskAssistant,
} from "@/lib/hooks/useAIDevPortfolioAssistant";
import { getClientId } from "@/lib/clientId";
import ElementContainer from "../element-container/ElementContainer";
import { skillsData } from "@/data/skillsData";
import FloatOnScroll from "./FlotOnScroll";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function HighlightedText({
  text,
  keywords,
  className = "",
  highlightClass = "rounded-[6px] bg-fuchsia-500/15 text-fuchsia-300/90 px-1 py-0.5 ring-1 ring-fuchsia-500/20",
}: {
  text: string;
  keywords: string[];
  className?: string;
  highlightClass?: string;
}) {
  const pattern = useMemo(() => {
    if (!keywords.length) return null;
    const union = keywords.map(escapeRe).join("|");
    return new RegExp(`(${union})`, "gi");
  }, [keywords]);

  if (!pattern) return <span className={className}>{text}</span>;

  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(text)) !== null) {
    const start = m.index;
    const end = start + m[0].length;

    const before = text[start - 1];
    const after = text[end];
    const isBoundary = (ch?: string) => !ch || !/[A-Za-z0-9+#.]/.test(ch);
    if (!isBoundary(before) || !isBoundary(after)) continue;

    if (start > last)
      nodes.push(<span key={`t-${last}`}>{text.slice(last, start)}</span>);
    nodes.push(
      <mark key={`h-${start}`} className={highlightClass}>
        {text.slice(start, end)}
      </mark>
    );
    last = end;
  }
  if (last < text.length)
    nodes.push(<span key={`r-${last}`}>{text.slice(last)}</span>);
  return <span className={className}>{nodes}</span>;
}

const AskMeBox = () => {
  useAssistantHealth(false);

  const { mutateAsync: ask, isPending, error } = useAskAssistant();
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);

  const keywords = useMemo(() => {
    const groups: any = skillsData?.skills ?? {};
    const list: string[] = [];
    Object.values(groups).forEach((arr: any) =>
      (arr ?? []).forEach((s: any) => s?.tech && list.push(String(s.tech)))
    );
    list.push("frontend", "backend", "full-stack", "API", "REST");
    return Array.from(new Set(list));
  }, []);

  const onSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isPending) return;

    setReply(null);
    try {
      const res = await ask({ userId: getClientId(), message: text });
      setReply(res.reply ?? "");
      setInput("");
    } catch {
      console.error("Error asking assistant:", error);
      setReply("Failed to get a response. Please try again.");
    }
  }, [ask, input, isPending, error]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const copyReply = async () => {
    if (!reply) return;
    try {
      await navigator.clipboard.writeText(reply);
    } catch {
      console.error("Failed to copy reply:", reply);
      alert("Failed to copy reply. Please try again.");
    }
  };

  const disabled = isPending || !input.trim();

  return (
    <FloatOnScroll
      threshold={400}
      floatClass="fixed bottom-4 right-[1rem] w-[18rem] sm:w-[20rem] md:w-[22rem] z-[60]"
      baseClass="relative w-full !max-w-[40rem] mx-auto"
    >
      <ElementContainer
        border
        className="p-5 bg-bg1-color rounded-2xl shadow-2xl  max-w-[64rem]"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-color3/10 border border-color3/30 grid place-items-center">
              <Bot className="w-5 h-5 text-color3" />
            </div>
            <div className="leading-tight">
              <h3 className="font-semibold text-color4">Ask me about Yamil</h3>
              <p className="text-xs text-color4/70">
                Default language: English · Press <kbd>Enter</kbd> to send
              </p>
            </div>
          </div>
          <div className="text-xs text-color4/70">Portfolio Assistant</div>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about skills, projects, availability… (Shift+Enter for newline)"
            className="w-full min-h-[84px] max-h-60 rounded-2xl border border-border-color bg-[#151515] text-sm p-4 pr-16 outline-none focus:ring-2 focus:ring-color3/40 placeholder:text-color4/60 text-color4  overflow-y-auto no-scrollbar resize-none"
          />
          <button
            type="button"
            onClick={onSend}
            disabled={disabled}
            className={[
              "absolute bottom-4 right-2 h-10 px-4 rounded-xl font-medium flex items-center gap-2",
              "transition shadow-sm",
              disabled
                ? "bg-[#2a2a2a] text-color4/60 cursor-not-allowed"
                : "bg-bg1-color text-color0 hover:opacity-90 active:opacity-80  cursor-pointer",
            ].join(" ")}
            aria-label="Send"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Sending…</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 " />
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-3 text-sm rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 px-3 py-2">
            {error.message}
          </div>
        )}

        {reply && (
          <div className="mt-4">
            <div className="rounded-2xl border border-border-color bg-[#151515] p-4 w-full max-w-[48rem]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-color3/10 border border-color3/30 grid place-items-center mt-0.5 shrink-0">
                  <Bot className="w-4 h-4 text-color3" />
                </div>

                <div className="flex-1 max-h-64 overflow-y-auto pr-1">
                  <HighlightedText
                    text={reply}
                    keywords={keywords}
                    className="text-sm leading-relaxed whitespace-pre-wrap break-words text-color4/60"
                    highlightClass="rounded-[6px] bg-color0/10 text-fuchsia-100/70 px-1 py-0.5 ring-1 ring-fuchsia-100/10"
                  />
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={copyReply}
                  className="text-xs text-color4 px-3 py-1.5 rounded-lg border border-border-color bg-[#171717] hover:bg-[#1f1f1f] transition flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h11v14Z"
                    />
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </ElementContainer>
    </FloatOnScroll>
  );
};

export default AskMeBox;
