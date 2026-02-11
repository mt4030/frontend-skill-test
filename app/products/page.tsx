"use client";

import { useEffect, useState } from "react";
import GameCard from "../components/gameSection/gamesCard";
import { useGames } from '@/providers/context';
import { Game } from '@/lib/type';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Show 15 items per page
  const { games, isLoading, error } = useGames();

  // Calculate total pages based on fetched data
  const totalPages = Math.ceil(games.length / itemsPerPage);

  // Slice products for the current page
  const currentProducts = games.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Pagination functions
  const goPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <section className="p-10 lg:px-50 bg-gray-900 min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
        {currentProducts.map((game: Game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-700 cursor-pointer text-white rounded hover:bg-gray-600"
          onClick={goPrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <button
          className="px-3 py-1 bg-gray-700 cursor-pointer text-white rounded hover:bg-gray-600"
          onClick={goNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Products;
