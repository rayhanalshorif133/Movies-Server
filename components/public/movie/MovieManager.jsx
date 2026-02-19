"use client";
import { useState, useEffect } from "react";
import MovieSection from "./MovieSection";
import ScouringMovies from "./ScouringMovies";
import NoMovieFound from "./NoMovieFound";
import MovieFilter from "./MovieFilter";


export default function MovieManager({ initialMovies }) {
    const [movies, setMovies] = useState(initialMovies);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchType, setSearchType] = useState("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchTitle.trim()) {
            setMovies(initialMovies);
            setLoading(false);
            return;
        }

        let active = true;

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/movies?title=${encodeURIComponent(searchTitle)}&type=${searchType}`);
                const data = await res.json();

                if (active) {
                    setMovies(data);
                }
            } catch (err) {
                if (active) console.error("Failed to fetch", err);
            } finally {
                if (active) setLoading(false);
            }
        }, 500);

        return () => {
            active = false; // "Cancel" this request if the user types again
            clearTimeout(delayDebounceFn);
        };
    }, [searchTitle]);

    useEffect(() => {
       
        let active = true; // Flag to prevent race conditions

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/movies?title=${encodeURIComponent(searchTitle)}&type=${searchType}`);
                const data = await res.json();

                // 2. Only update state if this effect is still "active"
                if (active) {
                    setMovies(data);
                }
            } catch (err) {
                if (active) console.error("Failed to fetch", err);
            } finally {
                if (active) setLoading(false);
            }
        }, 500);

        return () => {
            active = false; // "Cancel" this request if the user types again
            clearTimeout(delayDebounceFn);
        };
    }, [searchType]);




    // Grouping Logic
    const groupedMovies = movies?.reduce((acc, movie) => {
        const type = movie.type || 'Other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(movie);
        return acc;
    }, {});

    return (
        <>
            <MovieFilter searchType={searchType} setSearchType={setSearchType} setSearchTitle={setSearchTitle} />
            <div className="space-y-12">
                {loading ? <ScouringMovies /> : Object.keys(groupedMovies || {}).length > 0 ? (
                    Object.entries(groupedMovies).map(([type, items]) => (
                        <MovieSection key={type} type={type} items={items} />
                    ))
                ) : <NoMovieFound />}
            </div>
        </>
    );
}