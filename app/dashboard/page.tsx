"use client";

import { useRouter } from "next/navigation";
import GameCard from "../components/gameSection/gamesCard";
import { mockGames } from "@/app/data/mockgames";
import { useMe } from "@/hooks/useMe";

export default function Dashboard() {
  const { data: user, isLoading } = useMe(); // get logged-in user
  const router = useRouter();

  // --- Handle logout ---
  const handleLogout = async () => {
    localStorage.removeItem("token"); // clear token
    router.push("/"); // redirect to home
  };

  if (isLoading) return <p className="text-white p-4">Loading...</p>;

  if (!user)
    return (
      <div className="text-white p-4">
        You are not logged in. <br />
        <button
          className="mt-2 px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400"
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
      </div>
    );

  // Map user bookmarks/favorites to actual games
  const bookmarkedGames = mockGames.filter((g) =>
    user.bookmarks?.includes(g.id)
  );
  const favoriteGames = mockGames.filter((g) =>
    user.favorites?.includes(g.id)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400"
        >
          Logout
        </button>
      </div>

      {/* Bookmarks row */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Bookmarked Games</h2>
        {bookmarkedGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bookmarkedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No bookmarked games yet.</p>
        )}
      </section>

      {/* Favorites row */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Favorite Games</h2>
        {favoriteGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No favorite games yet.</p>
        )}
      </section>
    </div>
  );
}
