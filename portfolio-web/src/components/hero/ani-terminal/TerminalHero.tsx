import { useEffect, useRef, useState } from "react";
import { terminalLines } from "./terminalData";
import RetroContainer from "@/components/common/containers/RetroContainer";

const RESTART_DELAY = 15000;

export default function TerminalHero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLine >= terminalLines.length) return;

    const line = terminalLines[currentLine];
    const fullText = line.text;

    if (currentChar < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const copy = [...prev];
          copy[currentLine] = (copy[currentLine] || "") + fullText[currentChar];
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, 20);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, line.delay ?? 300);

      return () => clearTimeout(timeout);
    }
  }, [currentChar, currentLine]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines]);

  useEffect(() => {
    if (currentLine < terminalLines.length) return;

    const interval = setTimeout(() => {
      setDisplayedLines([]);
      setCurrentLine(0);
      setCurrentChar(0);

      if (terminalRef.current) {
        terminalRef.current.scrollTop = 0;
      }
    }, RESTART_DELAY);

    return () => clearTimeout(interval);
  }, [currentLine]);

  return (
    <RetroContainer
      className="
        w-full max-w-xl h-[400px]
        bg-[#111]
        p-4
        flex flex-col
        overflow-hidden
        justify-end
        shadow-[8px_8px_0px_#000]
        text-start
      "
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2  bg-[#1a1a1a]">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      {/* Terminal body */}
      <div
        ref={terminalRef}
        className="
          flex-1
          p-4
          font-mono
          text-[11px] sm:text-xs md:text-sm
          space-y-1
          overflow-y-auto
          text-gray-200
          scrollbar-thin
          scrollbar-thumb-black/40
        "
      >
        {displayedLines.map((line, index) => {
          const isTypingLine = index === currentLine;
          const isLastLine =
            currentLine >= terminalLines.length &&
            index === terminalLines.length - 1;

          return (
            <div
              key={index}
              className={terminalLines[index]?.color ?? "text-gray-300"}
            >
              {line}
              {(isTypingLine || isLastLine) && (
                <span className="ml-1 animate-pulse relative bottom-[2px]">
                  ▍
                </span>
              )}
            </div>
          );
        })}
      </div>
    </RetroContainer>
  );
}
