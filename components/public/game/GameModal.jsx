"use client";
import React from "react";

export default function GameModal({ game, onClose }) {
    const images = JSON.parse(game.asset_images || "[]");
    const gifs = JSON.parse(game.asset_gif_images || "[]");
    const allMedia = [...images, ...gifs];

    const getImageUrl = (id) => `https://lh3.googleusercontent.com/u/0/d/${id}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="relative bg-gray-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-800 shadow-2xl">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="p-6 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 uppercase">{game.title}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-600/30">{game.game_type}</span>
                            <span className="flex items-center gap-1">📁 {game.size} MB</span>
                            <span className="flex items-center gap-1">📧 {game.gmail}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {allMedia.map((mediaId, index) => (
                            <div key={index} className="relative group aspect-video rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                                <img
                                    src={getImageUrl(mediaId)}
                                    alt="Game asset"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                {index >= images.length && (
                                    <>
                                        <span className="absolute bottom-0 h-7.5 w-full right-0 bg-[#DEDEDE] inline-block"></span>
                                        <span className="absolute bottom-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">
                                            Animated
                                        </span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Footer */}
                    <div className="mt-10 pt-6 border-t border-gray-800 flex justify-between items-center">
                        <div className="text-gray-500 text-sm italic">Uploaded: {new Date(game.created_at).toLocaleDateString()}</div>
                        <a
                            href={`https://drive.google.com/uc?export=download&id=${game.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden relative group items-center justify-center gap-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>

                            {/* Download Icon */}
                            <svg
                                className="w-5 h-5 group-hover:animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>

                            <span className="relative">Download Full Assets</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}