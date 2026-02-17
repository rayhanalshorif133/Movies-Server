import Sidebar from '@/components/admin/Sidebar'
import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { HiOutlineFilm } from "react-icons/hi"
import MovieList from '@/components/admin/movie/MovieList'

export async function generateMetadata() {
    return {
        title: "Movie List | Admin Panel",
    };
}

export default async function Page({ searchParams }) {
    const supabase = await createClient()

    const resolvedSearchParams = await searchParams;

    const page =  Number(resolvedSearchParams?.page ?? 1)
    const search = resolvedSearchParams?.search ?? ''
    const limit = 20
    const from = (page - 1) * limit
    const to = from + limit - 1

    let countQuery = supabase
        .from('movies')
        .select('*', { count: 'exact', head: true })

    let dataQuery = supabase
        .from('movies')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

    if (search) {
        countQuery = countQuery.ilike('title', `%${search}%`)
        dataQuery = dataQuery.ilike('title', `%${search}%`)
    }

    const [
        { count: movieCount },
        { data: movies }
    ] = await Promise.all([
        countQuery,
        dataQuery.range(from, to)
    ])

    return (
        <div className="bg-gray-50 flex min-h-screen">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <nav className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">
                            Admin / Dashboard
                        </nav>
                        <h2 className="text-2xl font-extrabold text-gray-800">
                            Movies Management
                        </h2>
                    </div>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-teal-50 rounded-lg text-teal-600">
                            <HiOutlineFilm size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Movies
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {movieCount ?? 0}
                            </h3>
                        </div>
                    </div>
                </div>

                <MovieList
                    movieData={movies || []}
                    totalCount={movieCount || 0}
                    currentPage={page}
                    search={search}
                    limit={limit}
                />
            </div>
        </div>
    )
}
