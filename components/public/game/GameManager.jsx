"use client";
import { useState, useEffect } from "react";
import GameSection from "./GameSection";
import ScouringGames from "./SourchingGames";
import GameFilter from "./GameFilter";
import NoGameFound from "./NoGameFound";

export default function GameManager({ initialGames }) {
    const [games, setGames] = useState(initialGames);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchType, setSearchType] = useState("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/games?title=${searchTitle}&type=${searchType}`);
                const data = await res.json();
                setGames(data);
            } catch (err) {
                console.error("Failed to fetch games:", err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTitle, searchType]);

    const groupedGames = games?.reduce((acc, game) => {
        const type = game.game_type || 'Other Assets';
        if (!acc[type]) acc[type] = [];
        acc[type].push(game);
        return acc;
    }, {});

    return (
        <>
            <GameFilter
                searchType={searchType}
                setSearchType={setSearchType}
                setSearchTitle={setSearchTitle}
            />

            <div className="space-y-12">
                {loading ? (
                    <ScouringGames />
                ) : Object.keys(groupedGames || {}).length > 0 ? (
                    Object.entries(groupedGames).map(([type, items]) => (
                        <GameSection
                            key={type}
                            type={type}
                            items={items}
                        />
                    ))
                ) : (
                    <NoGameFound />
                )}
            </div>
        </>
    );
}