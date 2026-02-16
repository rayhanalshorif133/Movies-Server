"use client";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";




export default function GameModal({ game, onClose }) {
    const images = JSON.parse(game.asset_images || "[]");
    const gifs = JSON.parse(game.asset_gif_images || "[]");
    const allMedia = [...images, ...gifs];
    const [isSelectedGif, setIsSelectedGif] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const getImageUrl = (id) =>
        `https://lh3.googleusercontent.com/d/${id}`;

    const closeLightbox = () => setSelectedIndex(null);

    const updateIndex = (newIndex) => {
        setSelectedIndex(newIndex);
        const isGif = gifs.includes(allMedia[newIndex]);
        setIsSelectedGif(isGif);

    };

    const initialSetIndex = (index) => updateIndex(index);

    const nextImage = () => {
        const nextIdx = (selectedIndex + 1) % allMedia.length;
        updateIndex(nextIdx);
    };

    const prevImage = () => {
        const prevIdx = selectedIndex === 0 ? allMedia.length - 1 : selectedIndex - 1;
        updateIndex(prevIdx);
    };




    return (
        <>
            {/* Main Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                <div className="relative bg-gray-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-800 shadow-2xl">

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-red-500"
                    >
                        <RxCross2 />
                    </button>

                    <div className="p-6 md:p-10">
                        <h2 className="text-3xl font-bold text-white mb-6 uppercase">
                            {game.title}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {allMedia.map((mediaId, index) => {

                                const isGif = gifs.includes(mediaId);

                                return (
                                    <div
                                        key={index}
                                        onClick={() => initialSetIndex(index)}
                                        className="relative cursor-pointer group aspect-video rounded-xl overflow-hidden bg-gray-800"
                                    >
                                        <img
                                            src={getImageUrl(mediaId)}
                                            alt=""
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition"
                                        />

                                        {isGif && (
                                            <>
                                                <div className="absolute bottom-2 right-2 bg-yellow-500 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-wider border border-white/20 z-10">
                                                    GIF
                                                </div>
                                                <div className="absolute bottom-0 h-10 w-full gif-hide-placeholder"></div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/95">

                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 bg-red-400 text-black rounded-full hover:bg-red-500 right-6 hover:text-white text-3xl cursor-pointer"
                    >
                        <RxCross2 className="p-1" />
                    </button>

                    {/* Prev */}
                    <button
                        onClick={prevImage}
                        className="absolute left-6 hover:text-white text-3xl bg-teal-400 text-black rounded-full hover:bg-teal-700 cursor-pointer z-50"
                    >
                        <FaChevronLeft className="p-2" />
                    </button>

                    <div className="relative">
                        <img
                            src={getImageUrl(allMedia[selectedIndex])}
                            className="max-h-[85vh] max-w-[90vw] object-contain"
                            alt=""
                        />

                        <div className={`absolute bottom-0 h-[20%]  w-full gif-hide-placeholder ${isSelectedGif ? 'opacity-100' : 'opacity-0'}`}></div>

                    </div>


                    {/* Next */}
                    <button
                        onClick={nextImage}
                        className="absolute right-6 hover:text-white text-3xl bg-teal-400 text-black rounded-full hover:bg-teal-700 cursor-pointer"
                    >
                        <FaChevronRight className="p-2" />
                    </button>
                </div>
            )}
        </>
    );
}
