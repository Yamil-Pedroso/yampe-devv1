import React from "react";
import { FaReact, FaCode, FaLayerGroup, FaBolt } from "react-icons/fa";

const MiniWeb: React.FC = () => {
  return (
    <div
      className="
        w-full h-full
        bg-[#111111]
        border border-[#3a3a3a]
        flex flex-col
        text-[10px]
        text-[#d4d4aa]
        overflow-hidden
      "
    >
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#161616] border-b border-[#3a3a3a]">
        <span className="font-bold tracking-wide">modern.web</span>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#5a5a5a]" />
          <span className="w-2 h-2 bg-[#707070]" />
          <span className="w-2 h-2 bg-[#8a8a8a]" />
        </div>
      </div>

      {/* ===== Hero ===== */}
      <div className="px-3 py-4 bg-[#141414] border-b border-[#2a2a2a]">
        <p className="font-bold text-[#7cff6b] text-[11px]">
          Modern Web Development
        </p>
        <p className="text-[#9a9a9a] leading-tight mt-1">
          Interactive & engaging user interfaces
          <br />
          built with modern frontend technologies.
        </p>
      </div>

      {/* ===== Features ===== */}
      <div className="flex-1 grid grid-cols-2 gap-2 p-3 bg-[#111111]">
        <div className="bg-[#1c1c1c] border border-[#2f2f2f] p-2 flex gap-2">
          <FaReact className="text-[#7cff6b] text-[14px]" />
          <div>
            <p className="font-bold">Component-Driven</p>
            <p className="text-[#8f8f8f] leading-tight">Reusable UI systems</p>
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-[#2f2f2f] p-2 flex gap-2">
          <FaLayerGroup className="text-[#7cff6b] text-[14px]" />
          <div>
            <p className="font-bold">Interactive UX</p>
            <p className="text-[#8f8f8f] leading-tight">Motion & feedback</p>
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-[#2f2f2f] p-2 flex gap-2">
          <FaCode className="text-[#7cff6b] text-[14px]" />
          <div>
            <p className="font-bold">Modern Stack</p>
            <p className="text-[#8f8f8f] leading-tight">React · TS · CSS</p>
          </div>
        </div>

        <div className="bg-[#1c1c1c] border border-[#2f2f2f] p-2 flex gap-2">
          <FaBolt className="text-[#7cff6b] text-[14px]" />
          <div>
            <p className="font-bold">Performance</p>
            <p className="text-[#8f8f8f] leading-tight">Fast & responsive</p>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div className="px-3 py-2 bg-[#161616] border-t border-[#3a3a3a] flex justify-between">
        <span className="text-[#6f6f6f]">frontend.sys</span>
        <span className="text-[#7cff6b] font-bold tracking-wide">
          explore →
        </span>
      </div>
    </div>
  );
};

export default MiniWeb;
