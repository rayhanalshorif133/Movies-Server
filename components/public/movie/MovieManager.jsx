"use client";
import { useState, useEffect } from "react";
import MovieSection from "./MovieSection";
import { IoSearch } from "react-icons/io5";


export default function MovieManager({ initialMovies }) {
    const [movies, setMovies] = useState(initialMovies);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/movies?query=${searchTerm}`);
                const data = await res.json();
                setMovies(data);
            } catch (err) {
                console.error("Failed to fetch", err);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms debounce: type kora thamanor por request jabe

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Grouping Logic
    const groupedMovies = movies?.reduce((acc, movie) => {
        const type = movie.type || 'Other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(movie);
        return acc;
    }, {});

    return (
        <>
            

            <div className="pt-6 pb-8 px-4 flex flex-col items-center shadow-inner">
                <div
                    className="movie_filter flex flex-wrap justify-center gap-4 md:gap-6 mb-5 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <div className="flex gap-8 px-6 items-center">
                        <button className="border-none relative group">
                            <span className="text-xs pb-0.5 uppercase flex items-center gap-1">
                                <span className="flex mb-1">
                                    <span className="dot-bounce">.</span>
                                    <span className="dot-bounce delay-100">.</span>
                                    <span className="dot-bounce delay-200">.</span>
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="relative w-full max-w-lg group">
                    <div
                        className="absolute -inset-0.5 bg-linear-to-r from-pink-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500">
                    </div>
                    <div className="relative flex items-center">
                        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for movies ..."
                            className="movie-search-input w-full bg-[#1e293b] text-gray-200 placeholder-gray-500 rounded-full py-2.5 px-5 border border-gray-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 shadow-xl text-sm transition-all" />
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-600 hover:bg-pink-700 text-white h-10 w-10 rounded-full transition">
                            <IoSearch className='flex justify-items-center mx-auto' />
                        </button>
                    </div>
                </div>
            </div>

            {/* Movie Sections */}
            <div className="space-y-12">
                {loading ? (
                    <p className="text-white">Searching...</p>
                ) : Object.keys(groupedMovies || {}).length > 0 ? (
                    Object.entries(groupedMovies).map(([type, items]) => (
                        <MovieSection key={type} type={type} items={items} />
                    ))
                ) : (
                    <p className="text-slate-400">No movies found.</p>
                )}
            </div>
        </>
    );
}