"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GameCard from "../components/gameSection/gamesCard";
import { useMe } from "@/hooks/useMe";
import { useGames } from "@/providers/context";

export default function Dashboard() {
  const router = useRouter();

  // Hooks always run first
  const { data: user, isLoading } = useMe();
  const { games, favorite, bookmark, handleFavorite, handleBookmark } = useGames();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  // While loading or redirecting, render a loader
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Filter games for user bookmarks/favorites
  const bookmarkedGames = games.filter((g) => bookmark.includes(g.id));
  const favoriteGames = games.filter((g) => favorite.includes(g.id));

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-60 bg-gray-950 p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <p className="mb-2">Welcome, {user.firstName || "Gamer"}!</p>
        <p className="mb-6 text-gray-400">{games.length} games available</p>
        <button
          onClick={() => router.push("/")}
          className="mb-4 w-full px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="mb-4 w-full px-4 py-2 bg-gray-800 border border-amber-500 text-amber-300 rounded hover:bg-amber-400 hover:text-black"
        >
          Profile
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="w-full px-4 py-2 bg-red-600 text-black rounded hover:bg-red-500"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-10">
        {/* Bookmarks */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Bookmarked Games</h3>
            <span className="text-gray-400 text-sm">
              {bookmarkedGames.length} {bookmarkedGames.length === 1 ? "game" : "games"}
            </span>
          </div>
          {bookmarkedGames.length === 0 ? (
            <p className="text-gray-400">You haven't bookmarked any games yet.</p>
          ) : (
            <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {bookmarkedGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favorite.includes(game.id)}
                  isBookmarked={true}
                  onFavorite={() => handleFavorite(game.id)}
                  onBookmark={() => handleBookmark(game.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Favorites */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Favorite Games</h3>
            <span className="text-gray-400 text-sm">
              {favoriteGames.length} {favoriteGames.length === 1 ? "game" : "games"}
            </span>
          </div>
          {favoriteGames.length === 0 ? (
            <p className="text-gray-400">You haven't marked any favorites yet.</p>
          ) : (
            <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {favoriteGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={true}
                  isBookmarked={bookmark.includes(game.id)}
                  onFavorite={() => handleFavorite(game.id)}
                  onBookmark={() => handleBookmark(game.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
