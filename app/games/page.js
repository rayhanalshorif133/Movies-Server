import GameManager from "@/components/public/game/GameManager";
import Header from "@/components/public/Header";
import { createClient } from '@/utils/supabase/server';

export async function generateMetadata() {
  return {
    title: "Games & Assets",
  };
}

export default async function Home() {
  const supabase = await createClient();
  const { data: initialGames } = await supabase.from('games').select('*');

  return (
    <div className="flex flex-col bg-slate-900 min-h-screen font-sans">
      <Header />
      <main className="grow max-w-7xl mx-auto px-4 py-10">
        <GameManager initialGames={initialGames || []} />
      </main>
    </div>
  );
}