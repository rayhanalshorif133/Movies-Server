"use client";
import React, { useState } from "react";

export default function GameModal({ game, onClose }) {
    const images = JSON.parse(game.asset_images || "[]");
    const gifs = JSON.parse(game.asset_gif_images || "[]");
    const allMedia = [...images, ...gifs];

    const [selectedIndex, setSelectedIndex] = useState(null);

    const getImageUrl = (id) =>
        `https://lh3.googleusercontent.com/d/${id}`;

    const closeLightbox = () => setSelectedIndex(null);

    const nextImage = () =>
        setSelectedIndex((prev) => (prev + 1) % allMedia.length);

    const prevImage = () =>
        setSelectedIndex((prev) =>
            prev === 0 ? allMedia.length - 1 : prev - 1
        );

    return (
        <>
            {/* Main Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                <div className="relative bg-gray-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-800 shadow-2xl">

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-red-500"
                    >
                        ✕
                    </button>

                    <div className="p-6 md:p-10">
                        <h2 className="text-3xl font-bold text-white mb-6 uppercase">
                            {game.title}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {allMedia.map((mediaId, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    className="cursor-pointer group aspect-video rounded-xl overflow-hidden bg-gray-800"
                                >
                                    <img
                                        src={getImageUrl(mediaId)}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-105 transition"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95">

                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white text-3xl"
                    >
                        ✕
                    </button>

                    {/* Prev */}
                    <button
                        onClick={prevImage}
                        className="absolute left-6 text-white text-4xl"
                    >
                        ‹
                    </button>

                    {/* Image */}
                    <img
                        src={getImageUrl(allMedia[selectedIndex])}
                        className="max-h-[85vh] max-w-[90vw] object-contain"
                        alt=""
                    />

                    {/* Next */}
                    <button
                        onClick={nextImage}
                        className="absolute right-6 text-white text-4xl"
                    >
                        ›
                    </button>
                </div>
            )}
        </>
    );
}
