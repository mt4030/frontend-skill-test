'use client'

import { useEffect, useState } from "react";
import { use } from 'react';
import { useGames } from '@/providers/context';
import GameCard from '@/app/components/gameSection/gamesCard'; // Assuming GameCard is your individual game card component

interface PageProps {
  params: Promise<{ genre: string }>;
}

const GenrePage = ({ params }: PageProps) => {
  const { games } = useGames();
  const { genre } = use(params);
  
  // Filter games based on the selected genre
  const genreGames = games.filter(game =>
    game.genres.some((g: any) => g.slug === genre)
  );

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Show 15 items per page
  const totalPages = Math.ceil(genreGames.length / itemsPerPage);

  // Slice products for the current page
  const currentProducts = genreGames.slice(
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 px-10 pt-20">
      <h1 className="text-3xl font-bold text-amber-50 capitalize mb-6">
        {genre.replace('-', ' ')}
      </h1>

      {/* Grid Layout for the current page's games */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {currentProducts.map((game: any) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2 mt-20">
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
    </div>
  );
};

export default GenrePage;
