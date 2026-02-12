"use client"; // MUST be at the top

import { use } from "react";
import { useGames } from "@/providers/context";
import { Heart, Bookmark, Laptop, Smartphone, Tv } from "lucide-react"; // example icons
import GameError from "./GameError";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const platformIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("pc")) return <Laptop className="w-4 h-4" />;
  if (lower.includes("playstation") || lower.includes("ps")) return <Tv className="w-4 h-4" />;
  if (lower.includes("xbox")) return <Tv className="w-4 h-4" />;
  if (lower.includes("switch") || lower.includes("mobile")) return <Smartphone className="w-4 h-4" />;
  return <Laptop className="w-4 h-4" />; // default icon
};

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = use(params);
  const { games, handleBookmark, handleFavorite, favorite, bookmark } = useGames();
  const gameId = Number(id);
  const game = games.find(g => g.id === gameId);
  const isFavorited = favorite.includes(gameId);
  const isBookmarked = bookmark.includes(gameId);

  if (!game)
    return (
     <GameError/>
    );

  return (
    <div className="relative bg-gray-900 min-h-screen text-white pb-10">
     <div className="relative w-full h-[50vh] overflow-hidden">
  <img
    src={game.background_image}
    alt={game.name}
    className="w-full h-full object-cover"
  />
</div>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        <div className="absolute bottom-0 h-[40%] w-full bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:-mt-60 -mt-93">
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full md:w-[420px] h-auto rounded-xl shadow-2xl"
          />

          <div className="flex flex-col gap-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{game.name}</h1>

            <div className="text-gray-300 leading-relaxed mt-2">
              Released: {game.released} | ESRB: {game.esrb_rating?.name || "N/A"}
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400 mt-2">
              <span>⭐ {game.rating}</span>
              <span>Playtime: {game.playtime || 0} hrs</span>
            </div>

            {/* Platforms with icons */}
            <div className="flex flex-wrap gap-3 mt-4">
              {game.platforms?.map(p => (
                <span
                  key={p.platform.id}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gray-800/50 text-amber-400"
                >
                  {platformIcon(p.platform.name)}
                  {p.platform.name}
                </span>
              ))}
            </div>

            {/* Genres badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {game.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black transition"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => handleFavorite(game.id)}
                className={`inline-flex items-center gap-2 border px-6 py-2 rounded transition
                  ${isFavorited ? "bg-red-600 border-red-600" : "border-gray-500 hover:bg-gray-800"}
                `}
              >
                <Heart size={18} fill={isFavorited ? "white" : "none"} />
                Favorite
              </button>

              <button
                onClick={() => handleBookmark(game.id)}
                className={`inline-flex items-center gap-2 border px-6 py-2 rounded transition
                  ${isBookmarked ? "bg-blue-600 border-blue-600" : "border-gray-500 hover:bg-gray-800"}
                `}
              >
                <Bookmark size={18} fill={isBookmarked ? "white" : "none"} />
                Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
