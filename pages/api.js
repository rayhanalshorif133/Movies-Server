"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Mail, Film, Gamepad2, Activity, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const handleNavigation = (action) => {
    router.push(`${action}`);
  };

  const menuItems = [
    {
      label: "Gmails",
      path: "/api/gmail/fetch",
      icon: <Mail size={22} />,
      color: "blue",
      description: "Sync messages",
    },
    {
      label: "Movies",
      path: "/api/movie/fetch",
      icon: <Film size={22} />,
      color: "emerald",
      description: "Update library",
    },
    {
      label: "Games",
      path: "/api/game/fetch",
      icon: <Gamepad2 size={22} />,
      color: "amber",
      description: "Refresh stats",
    },
  ];

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-[#09090b] font-sans p-6`}>
      {/* Background Gradient Decorative Element */}
      <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-[#09090b]">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-blue-100 dark:bg-blue-900/10 opacity-50 blur-[80px]"></div>
      </div>

      <div className="w-full max-w-md overflow-hidden bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none">
        <div className="p-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-zinc-900 dark:bg-white rounded-lg">
                <Activity size={18} className="text-white dark:text-zinc-900" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                API Control
              </h1>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Manage and synchronize your movie diary data sources.
            </p>
          </header>

          <div className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="group w-full flex cursor-pointer items-center justify-between p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-${item.color}-50 dark:bg-${item.color}-950/30 text-${item.color}-600 dark:text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{item.label}</p>
                    <p className="text-xs text-zinc-400">{item.description}</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-zinc-300 group-hover:text-zinc-500 transition-colors" />
              </button>
            ))}
          </div>

          <footer className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                  Supabase Connected
                </span>
              </div>
              <span className="text-[11px] text-zinc-300 dark:text-zinc-600 font-mono">v1.0.0</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}