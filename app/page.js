import Header from "@/components/public/Header";
import MovieSection from "@/components/public/MovieSection"; // Notun component
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const { data: movies, error } = await supabase
    .from('movies')
    .select('*')

  if (error) console.error(error.message)

  const groupedMovies = movies?.reduce((acc, movie) => {
    const type = movie.type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(movie);
    return acc;
  }, {});

  const randomizedSections = groupedMovies 
    ? Object.entries(groupedMovies)
        .map(([type, items]) => {
          const shuffledItems = items.sort(() => Math.random() - 0.5);
          return [type, shuffledItems];
        })
        .sort(() => Math.random() - 0.5)
    : [];

  return (
    <div className="flex flex-col bg-slate-900 min-h-screen font-sans">
      <Header />
      
      <main className="grow w-full max-w-7xl mx-auto px-4 py-10 space-y-12">
        {randomizedSections.length > 0 ? (
          randomizedSections.map(([type, items]) => (
            <MovieSection key={type} type={type} items={items} />
          ))
        ) : (
          <div className="text-center py-20 text-slate-400">
             <p className="text-xl">No movies found.</p>
          </div>
        )}
      </main>
    </div>
  );
}