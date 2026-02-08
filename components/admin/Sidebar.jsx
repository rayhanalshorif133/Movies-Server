import { logout } from '@/app/login/actions'
import React from 'react'

export default async function Sidebar() {



    return (
        <aside className="w-64 bg-white min-h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="bg-yellow-400 w-fit px-2 h-8 uppercase rounded-md flex items-center justify-center text-xs">
                        Movie
                    </span>
                    Admin Panel
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-md font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    Dashboard
                </a>

                <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase">Entertainment</div>
                <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>
                    Movies List
                </a>
                <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                    Upload Movie
                </a>

                <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase">Gaming</div>
                <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
                    Games & Assets
                </a>

                <div className="pt-4 pb-2 px-3 text-xs font-semibold text-gray-400 uppercase">Communication</div>
                <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-md transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Gmail List
                </a>
            </nav>

            <div ac className="p-4 border-t border-gray-100">

                <form action={logout}>
                    <button className="cursor-pointer flex items-center gap-3 w-full p-2 text-red-500 hover:bg-red-50 rounded-md transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </form>
            </div>
        </aside>
    )
}
