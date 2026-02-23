import { getGoogleDriveImageUrl, getGoogleDrivePreviewUrl } from "@/utils/google/manage-image";
import Image from "next/image";
import { useState, useEffect } from "react";
import { RxCross2, RxArrowLeft } from "react-icons/rx";

export default function MovieDetailsModal({ movie, onClose }) {
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [closeBtnPosition, setCloseBtnPosition] = useState('right-4');


    useEffect(() => {
        if (isPreviewing) {
            setCloseBtnPosition('right-15');
        } else {
            setCloseBtnPosition('right-4');
        }
    }, [isPreviewing]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative bg-slate-900 border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">

                <button
                    onClick={onClose}
                    className={`absolute cursor-pointer top-4 ${closeBtnPosition} z-20 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full transition hover:rotate-90`}
                >
                    <RxCross2 />
                </button>

                {isPreviewing && (
                    <button
                        onClick={() => setIsPreviewing(false)}
                        className="absolute cursor-pointer top-4 left-4 z-20  hover:bg-red-700 text-white px-3 py-1.5 rounded-sm flex items-center gap-2 text-sm transition"
                    >
                        <RxArrowLeft />
                    </button>
                )}

                <div className="flex flex-col md:flex-row h-auto sm:min-h-100">
                    {!isPreviewing ? (
                        <>
                            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                                <div className="relative aspect-2/3 w-full">
                                    <Image
                                        src={movie.poster_in_drive ? getGoogleDriveImageUrl(movie.poster) : movie.poster}
                                        alt={movie.title || "Movie Poster"}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                        className="object-cover rounded-lg"
                                        priority={true} 
                                    />
                                </div>
                            </div>
                            <div className="p-8 md:w-1/2 flex flex-col justify-center">
                                <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
                                <div className="flex gap-3 mt-3">
                                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/30">
                                        {movie.dubbed_lang || 'English'}
                                    </span>
                                    <span className="bg-slate-700 text-gray-300 text-xs px-2 py-1 rounded">
                                        {movie.size} MB
                                    </span>
                                </div>

                                <p className="text-gray-400 mt-6 text-sm leading-relaxed">
                                    You are about to watch <b>{movie.title}</b>. This movie is categorized as {movie.type}.
                                    Make sure you have a stable internet connection for the best experience.
                                </p>
                                <button
                                    onClick={() => setIsPreviewing(true)}
                                    className="relative group mt-8 w-full h-16 overflow-hidden rounded-xl p-0.5 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                                >
                                    <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#a855f7_50%,#3b82f6_100%)] group-hover:opacity-100 opacity-40 transition-opacity"></div>

                                    <div className="relative flex h-full w-full items-center justify-center gap-3 rounded-[10px] bg-slate-900 px-7 py-2 text-white transition-all duration-300 group-hover:bg-slate-900/80 backdrop-blur-xl">

                                        <svg
                                            className="w-6 h-6 fill-current text-blue-400 group-hover:text-blue-300 transition-colors"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>

                                        <span className="text-sm font-bold tracking-widest uppercase">
                                            Watch Now
                                        </span>

                                        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    </div>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full aspect-video md:aspect-auto md:h-125 bg-black overflow-hidden">
                            <iframe
                                src={getGoogleDrivePreviewUrl(movie.url)}
                                className="w-full h-full border-none"
                                allow="autoplay"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}