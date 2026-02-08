import Header from "@/components/public/Header";
import LoadingCard from "@/components/public/LoadingCard";
import MovieCard from "@/components/public/MovieCard";
import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'


export default async function Home() {
  const supabase = await createClient()

  const { data: movies, error } = await supabase
    .from('movies')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching movies:', error.message)
  }

  return (
    <div className="flex flex-col items-center bg-slate-900 min-h-screen justify-center font-sans">
      <Header />
      <main className="grow w-full max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <Suspense key={movie.id} fallback={<LoadingCard />}>
                <MovieCard movie={movie} />
              </Suspense>
            ))
          ) : (
            <p className="text-white">No movies found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
