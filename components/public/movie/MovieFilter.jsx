import React from 'react'
import { IoSearch } from "react-icons/io5";

export default function MovieFilter({ movies, setSearchTerm }) {
    return (
        <div className="pt-2 pb-8 px-4 flex flex-col items-center shadow-inner">
            <div
                className="movie_filter flex flex-wrap justify-center gap-4 md:gap-6 mb-5 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <button class="border-b text-xs cursor-pointer border-pink-500 pb-0.5 uppercase text-pink-500 transition">
                    All
                </button>
                {Object.entries(movies).map(([type, items]) => (
                    <button key={type} className="border-none text-xs cursor-pointer border-pink-500 pb-0.5 uppercase hover:text-pink-500 transition">
                        {type.replace(/-/g, ' ')}
                    </button>
                ))}
                <button class="border-none text-xs cursor-pointer border-pink-500 pb-0.5 uppercase hover:text-pink-500 transition">
                    Series
                </button>
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
    )
}
