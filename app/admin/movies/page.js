import Sidebar from '@/components/admin/Sidebar'
import React from 'react'
import { createClient } from '@/utils/supabase/server';
import { HiOutlineFilm, HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import Badge from '@/components/common/Badge';
import MovieRow from '@/components/admin/movie/MovieRow';

export async function generateMetadata() {
    return {
        title: "Movie List | Admin Panel",
    };
}



export default async function Page() {
    const supabase = await createClient();

    const [
        { count: movieCount },
        { data: movies }
    ] = await Promise.all([
        supabase.from('movies').select('*', { count: 'exact', head: true }),
        supabase.from('movies').select('*').order('created_at', { ascending: false })
    ]);

    const movieData = movies || [];

    return (
        <div className="bg-gray-50 flex min-h-screen">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                {/* Header Section */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <nav className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">Admin / Dashboard</nav>
                        <h2 className="text-2xl font-extrabold text-gray-800">Media Management</h2>
                    </div>
                </header>

                {/* Stat Cards - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-teal-50 rounded-lg text-teal-600"><HiOutlineFilm size={24} /></div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Movies</p>
                            <h3 className="text-2xl font-bold text-gray-800">{movieCount ?? 0}</h3>
                        </div>
                    </div>
                </div>

                {/* Movies Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h3 className="font-bold text-gray-800 text-lg">Movies List</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Poster</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Storage Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Dubbed</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Upload Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {movieData.length > 0 ? (
                                    movieData.map((movie) => (
                                        <MovieRow key={movie.id} movie={movie}/>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
                                            No movies available in your database.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}