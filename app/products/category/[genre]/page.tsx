
'use client';

import { use, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import MovieCard from '@/app/components/movieSection/moviesCard';
import Loading from '@/app/components/Loading';

import { useMovieGenres } from '@/hooks/useMovies';
import { fetchMovies } from '@/lib/api-calls';

const ITEMS_PER_PAGE = 15;

interface PageProps {
  params: Promise<{ genre: string }>;
}

export default function GenrePage({ params }: PageProps) {
  const { genre: genreSlug } = use(params);

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch Watchmode genres
  const {
    data: genres = [],
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useMovieGenres();

  // Find the selected genre using its slug
  const selectedGenre = genres.find(
    (item) => item.slug === genreSlug
  );

  // Fetch titles belonging to that genre
  const {
    data,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useQuery({
    queryKey: [
      'genre-movies',
      selectedGenre?.id,
      currentPage,
    ],

    queryFn: () =>
      fetchMovies({
        limit: ITEMS_PER_PAGE,
        page: currentPage,
        types: 'movie,tv_series',
        genres: String(selectedGenre!.id),
      }),

    enabled: selectedGenre !== undefined,

    staleTime: 30 * 60 * 1000,
  });

  const movies = data?.titles ?? [];

  // Reset pagination when the genre changes
  useEffect(() => {
    setCurrentPage(1);
  }, [genreSlug]);

  // Scroll to top after changing pages
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const totalResults = data?.total_results;

  const totalPages =
    totalResults !== undefined
      ? Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE))
      : undefined;

  const hasNextPage =
    totalPages !== undefined
      ? currentPage < totalPages
      : movies.length === ITEMS_PER_PAGE;

  const goPrev = () => {
    setCurrentPage((previous) => Math.max(1, previous - 1));
  };

  const goNext = () => {
    if (hasNextPage) {
      setCurrentPage((previous) => previous + 1);
    }
  };

  // Genre loading
  if (isGenresLoading) {
    return <Loading />;
  }

  if (isGenresError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-red-400">
        Failed to load genres.
      </div>
    );
  }

  // Invalid genre
  if (!selectedGenre) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Genre not found.
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-900 px-6 pb-20 pt-16 text-white md:px-12 lg:px-24">

      <div className="mb-8">

        <h1 className="mb-2 text-3xl font-bold capitalize text-amber-50 md:text-4xl">
          {selectedGenre.name}
        </h1>

        <p className="text-sm text-gray-400">
          Movies and TV shows in the {selectedGenre.name} genre
        </p>

      </div>

      {/* Loading */}
      {isMoviesLoading && <Loading />}

      {/* Error */}
      {isMoviesError && (
        <p className="text-center text-red-400">
          Failed to load titles. Please try again.
        </p>
      )}

      {/* Results */}
      {!isMoviesLoading && !isMoviesError && (
        <>
          {movies.length === 0 ? (
            <p className="py-16 text-center text-gray-400">
              No titles found in this genre.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-4">

            <button
              type="button"
              onClick={goPrev}
              disabled={currentPage === 1 || isMoviesLoading}
              className="rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-gray-300">
              Page {currentPage}
              {totalPages !== undefined && ` of ${totalPages}`}
            </span>

            <button
              type="button"
              onClick={goNext}
              disabled={!hasNextPage || isMoviesLoading}
              className="rounded bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </>
      )}

    </main>
  );
}
