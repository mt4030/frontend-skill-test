"use client"; // MUST be at the top

import { use } from "react";
import { useGames } from "@/providers/context";
import { Heart, Bookmark } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = use(params);
  const { games } = useGames();
  const gameId = Number(id);
  const game = games.find(g => g.id === gameId);

  if (!game) return <div className="min-h-screen flex items-center justify-center text-white">Game not found</div>;

  return (
    <section className="relative bg-gray-900 min-h-screen text-white pb-10">
      <div
        className="h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${game.background_image})` }}
      />
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

            <div className="flex flex-wrap gap-2">
              {game.platforms?.map(p => (
                <span
                  key={p.platform.id}
                  className="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400"
                >
                  {p.platform.name}
                </span>
              ))}
            </div>

            <div className="text-gray-300 leading-relaxed mt-2">
              Released: {game.released} | ESRB: {game.esrb_rating?.name || "N/A"}
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400 mt-2">
              <span>⭐ {game.rating}</span>
              <span>Playtime: {game.playtime || 0} hrs</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <button className="inline-flex items-center gap-2 border border-gray-500 px-6 py-2 rounded hover:bg-gray-800 transition">
                <Heart size={18} /> Favorite
              </button>
              <button className="inline-flex items-center gap-2 border border-gray-500 px-6 py-2 rounded hover:bg-gray-800 transition">
                <Bookmark size={18} /> Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;