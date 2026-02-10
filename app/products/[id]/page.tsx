import { mockGames } from "@/app/data/mockgames";
import Image from "next/image";
import { Heart, Bookmark, Play } from "lucide-react";
interface ProductPageProps {
  params: { id: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
   const { id } = await params;
  const gameId = Number(id);

  const game = mockGames.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Game not found
      </div>
    );
  }
 const handleProtectedAction = () => {

  };
  return (
<section className="relative bg-gray-900 min-h-screen text-white pb-10">
      {/* Background */}
      <div
        className="h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${game.background_image})` }}
      />
      <div className="absolute inset-0">
  {/* smooth cinematic fade */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

  {/* extra dark punch ONLY on bottom 40% */}
  <div className="absolute bottom-0 h-[40%] w-full bg-gradient-to-t from-black to-transparent" />
</div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:-mt-60 -mt-93 ">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <Image
            src={game.thumbnail}
            alt={game.name}
            width={420}
            height={520}
            className="w-35 md:w- rounded-xl shadow-2xl"
          />

          {/* Info */}
          <div className="flex flex-col gap-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">
              {game.name}
            </h1>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {game.genres.map(g => (
                <span
                  key={g.slug}
                  className="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed">
              {game.summary}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span>{game.released}</span>
              <span>⭐ {game.rating}</span>
              <span>Metacritic {game.metacritic}</span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-4">
              {/* Trailer */}
              <a
                href={game.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border bg-amber-400 text-gray-800 border-gray-500 px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                <Play size={18} />
                Watch Trailer
              </a>

              {/* Favorite */}
              <button
               
                className="inline-flex items-center gap-2 border border-gray-500 px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                <Heart size={18} />
                Favorite
              </button>

              {/* Bookmark */}
              <button
               
                className="inline-flex items-center gap-2 border border-gray-500 px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                <Bookmark size={18} />
                Bookmark
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
