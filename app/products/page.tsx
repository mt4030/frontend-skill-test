
'use client';

import { useEffect, useState } from 'react';

import MovieCard from '../components/movieSection/moviesCard';
import Loading from '../components/Loading';

import { useHomeMovies } from '@/hooks/useMovies';

const ITEMS_PER_PAGE = 20;

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);

  // Reuse the initial 100 movies fetched for the homepage.
  const {
    data: movies = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useHomeMovies();

  // Calculate pagination from the actual fetched collection.
  const totalPages = Math.max(
    1,
    Math.ceil(movies.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Display only 20 movies on the current page.
  const currentMovies = movies.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const hasNextPage = currentPage < totalPages;

  // Scroll to top when the page changes.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const goPrev = () => {
    setCurrentPage((previous) => Math.max(1, previous - 1));
  };

  const goNext = () => {
    if (hasNextPage) {
      setCurrentPage((previous) => previous + 1);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gray-900 text-white">
        <p className="text-red-400">
          {error instanceof Error
            ? error.message
            : 'Failed to load movies.'}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-amber-500 px-5 py-2 font-semibold text-black hover:bg-amber-400"
        >
          Try again
        </button>
      </main>
    );
  }

  return (
    <section className="min-h-screen bg-gray-900 px-6 pb-20 pt-20 lg:px-20">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-amber-50">
          All Movies & TV Shows
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          {movies.length} titles loaded
        </p>
      </div>

      {/* Movies grid */}
      {currentMovies.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          No movies or TV shows found.
        </div>
      ) : (
        <div className="mb-10 mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          {currentMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}

        </div>
      )}

      {/* Pagination */}
      {movies.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center gap-4">

          <button
            type="button"
            onClick={goPrev}
            disabled={currentPage === 1}
            className="cursor-pointer rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={!hasNextPage}
            className="cursor-pointer rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>

        </div>
      )}

    </section>
  );
}
