import React from 'react'
import Link from 'next/link'

export default function Header() {
    return (
        <header className='w-full min-h-screen'>
            <nav
                className="bg-linear-to-r from-indigo-900 via-purple-800 to-teal-700 shadow-lg border-b border-white/10 relative z-50">
                <div className="px-4 md:px-8 py-4 flex items-center justify-between max-w-400 mx-auto">
                    <div className="flex items-center">
                        <Link href="index.html"
                            className="text-2xl md:text-3xl text-white font-cursive tracking-wide drop-shadow-md">
                            Entertainment Diary
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/games"
                            className="text-xs font-bold text-gray-100 uppercase hover:text-yellow-300 transition duration-300 flex items-center gap-1">
                            <i className="fa-solid fa-gamepad"></i> Games
                        </Link>
                        <Link href="/movies"
                            className="text-xs font-bold text-gray-100 uppercase hover:text-yellow-300 transition duration-300">Movies</Link>
                        <Link href="/login"
                            className="text-xs font-bold text-gray-100 uppercase hover:text-yellow-300 transition duration-300">Admin</Link>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button id="mobile-menu-btn" className="text-gray-200 hover:text-white focus:outline-none">
                            <i className="fa-solid fa-bars text-2xl"></i>
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" className="hidden md:hidden bg-purple-900 border-t border-white/10 shadow-xl">
                    <div className="flex flex-col px-4 py-4 space-y-4">
                        <Link href="/games"
                            className="text-sm font-bold text-gray-100 uppercase hover:text-yellow-300 transition duration-300"><i
                                className="fa-solid fa-gamepad mr-2"></i>Games</Link>
                        <Link href="/movies"
                            className="text-sm font-bold text-gray-100 uppercase hover:text-yellow-300 transition duration-300">Movies</Link>
                        <Link href="/login"
                            className="text-sm font-bold text-gray-100 uppercase hover:text-yellow-300 transition duration-300">Admin</Link>
                    </div>
                </div>
            </nav>

            <div className="bg-slate-900 min-h-screen pt-6 pb-8 px-4 flex flex-col items-center shadow-inner">
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
                        <input type="text" placeholder="Search for movies ..."
                            className="movie-search-input w-full bg-[#1e293b] text-gray-200 placeholder-gray-500 rounded-full py-2.5 px-5 border border-gray-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 shadow-xl text-sm transition-all"/>
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-pink-600 hover:bg-pink-700 text-white h-10 w-10 rounded-full transition">
                                <i className="fa-solid fa-magnifying-glass text-xs"></i>
                            </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
