import { useState } from "react";
import { RxCross2, RxArrowLeft } from "react-icons/rx";

export default function MovieDetailsModal({ movie, onClose }) {
  const [isPreviewing, setIsPreviewing] = useState(false);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    return url.replace("/view", "/preview");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 z-20 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full transition hover:rotate-90"
        >
          <RxCross2/>
        </button>

        {/* Back Button (শুধু প্রিভিউ মোডে দেখাবে) */}
        {isPreviewing && (
          <button 
            onClick={() => setIsPreviewing(false)}
            className="absolute cursor-pointer top-4 left-4 z-20 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm transition"
          >
            <RxArrowLeft/> Back to Details
          </button>
        )}

        <div className="flex flex-col md:flex-row min-h-100">
          {!isPreviewing ? (
            // --- মুভি ডিটেইলস ভিউ ---
            <>
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="object-cover w-full h-full" 
                />
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
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  Watch Now
                </button>
              </div>
            </>
          ) : (
            <div className="w-full aspect-video md:aspect-auto md:h-125 bg-black">
              <iframe
                src={getEmbedUrl(movie.url)}
                className="w-full h-full"
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