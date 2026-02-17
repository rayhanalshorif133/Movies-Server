"use client";
import React from 'react';

// Design Configuration object
const TYPE_STYLES = {
  Action: "text-rose-400 border-rose-500/50 bg-rose-500/10 shadow-[0_0_12px_rgba(244,63,94,0.3)]",
  Comedy: "text-amber-400 border-amber-500/50 bg-amber-500/10 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
  Horror: "text-purple-400 border-purple-500/50 bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.3)]",
  SciFi: "text-cyan-400 border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
  Drama: "text-emerald-400 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.3)]",
  Default: "text-slate-400 border-slate-700 bg-slate-800/50"
};

export default function TypeBadge({ type }) {
  const formattedType = type?.replace(/\s+/g, '') || "Default";
  const currentStyle = TYPE_STYLES[formattedType] || TYPE_STYLES.Default;

  return (
    <div className={`
      group relative inline-flex items-center justify-center 
      px-3 py-1 text-[11px] font-bold uppercase tracking-tighter
      border-l-2 rounded-r-md transition-all duration-500
      hover:pl-5 cursor-default overflow-hidden
      ${currentStyle}
    `}>
      {/* Background Animated Gradient Shine */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>

      {/* Unique Left Accent */}
      <span className="absolute left-0 top-0 h-full w-[2px] bg-current opacity-50"></span>
      
      <span className="relative z-10 flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-current"></span>
        {type}
      </span>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}