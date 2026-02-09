import React from 'react'
import { GoDotFill } from "react-icons/go";


export default function MovieFilterLoading() {
    return (
        <div className="flex gap-4 items-center">
            {[1, 2, 3, 4, 5, 6,7].map((n) => (
                <div
                    key={n}
                    className="flex items-center justify-center p-2"
                >
                    <GoDotFill className="font-xs text-pink-500 rounded-full animate-pulse" />
                    <GoDotFill className="font-xs text-pink-500 rounded-full animate-pulse" />
                    <GoDotFill className="font-xs text-pink-500 rounded-full animate-pulse" />
                    <GoDotFill className="font-xs text-pink-500 rounded-full animate-pulse" />
                </div>
            ))}
        </div>
    )
}