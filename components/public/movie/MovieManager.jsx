"use client";
import { useState, useEffect } from "react";
import MovieSection from "./MovieSection";
import ScouringMovies from "../_partials/ScouringMovies";
import NoMovieFound from "../_partials/NoMovieFound";
import MovieFilter from "./MovieFilter";


export default function MovieManager({ initialMovies }) {
    const [movies, setMovies] = useState(initialMovies);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/movies?query=${searchTerm}`);
                const data = await res.json();
                setMovies(data);
            } catch (err) {
                console.error("Failed to fetch", err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Grouping Logic
    const groupedMovies = movies?.reduce((acc, movie) => {
        const type = movie.type || 'Other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(movie);
        return acc;
    }, {});

    return (
        <>
            <MovieFilter movies={groupedMovies} setSearchTerm={setSearchTerm}/>
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