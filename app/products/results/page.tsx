"use client";


import { useSearchParams } from "next/navigation";
import { mockGames } from "@/app/data/mockgames";
import GameCard from "@/app/components/gameSection/gamesCard";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q") ?? "";
  const genresParam = searchParams?.get("genres") ?? "";
  const selectedGenres = genresParam ? genresParam.split(",") : [];
  const ratingParam = searchParams?.get("rating") ?? "1-10";
  const [minRating, maxRating] = ratingParam.split("-").map(Number);
 const itemsParam = searchParams?.get("items") ?? "5"; 
const itemsPerPage = Number(itemsParam);


  // Filter games based on search term, genres, and rating
  const filteredGames = mockGames.filter((game) => {
    const matchesSearch = q
      ? game.name.toLowerCase().includes(q.toLowerCase())
      : true;

    const matchesGenres = selectedGenres.length
      ? game.genres.some((g) => selectedGenres.includes(g.slug))
      : true;

    const matchesRating =
      game.rating >= minRating && game.rating <= maxRating;

    return matchesSearch && matchesGenres && matchesRating;
  });
const slicedGames = filteredGames.slice(0, itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Search Results</h1>

      {/* Display filtered games */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {slicedGames.length ? (
          slicedGames.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
          <div className="text-center col-span-full text-gray-400">
            No games found.
          </div>
        )}
      </div>
    </div>
  );
}
