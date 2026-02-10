"use client";
import Image from "next/image";

export default function GameCard({ game, onClick }) {
    // Google Drive Thumbnail Link Helper

    const getImageUrl = (id) => `https://lh3.googleusercontent.com/u/0/d/${id}=s600`;

    return (
        <div 
            onClick={() => onClick(game)} // কার্ডে ক্লিক করলে মোডাল ডাটা পাস হবে
            className="cursor-pointer group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
        >
            <div className="relative aspect-video overflow-hidden bg-gray-800">
                <Image
                    src={getImageUrl(game.thumbnail_image)}
                    alt={game.title}
                    fill // width/height এর বদলে fill ব্যবহার করা ভালো aspect-video এর জন্য
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized={true} // ড্রাইভ ইমেজের ক্ষেত্রে অপ্টিমাইজেশন এরর এড়াতে
                />
                
                {/* সাইজ ব্যাজ */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-tighter">
                    {game.size} MB
                </div>
            </div>

            {/* ডিটেইলস সেকশন */}
            <div className="p-4 space-y-3">
                <h3 className="text-md font-semibold text-gray-100 line-clamp-1 group-hover:text-blue-400 transition-colors capitalize">
                    {game.title}
                </h3>
                
                <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {game.view_count || 0} views
                    </span>
                    <span className="px-2 py-1 bg-gray-800 rounded text-[10px] font-medium text-gray-300">
                        {game.game_type}
                    </span>
                </div>
            </div>
        </div>
    );
}