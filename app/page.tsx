'use client';

import { useHomeMovies } from '@/hooks/useMovies';
import HeroSection from './components/heroSection/herosection';
import MovieList from './components/movieSection/movielist';
import Loading from './components/Loading';

export default function Home() {
  const {
    data: movies = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useHomeMovies();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
        <p>
          {error instanceof Error
            ? error.message
            : 'Failed to load movies.'}
        </p>

        <button
          onClick={() => refetch()}
          className="rounded-lg bg-amber-500 px-5 py-2 text-black"
        >
          Try again
        </button>
      </main>
    );
  }

  if (movies.length === 0) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        No titles found.
      </main>
    );
  }

  return (
    <main className="flex flex-col">
      <section className="relative left-1/2 w-screen -translate-x-1/2">
      
      <HeroSection moviesList={movies} />
      </section>

      <MovieList moviesList={movies} />
    </main>
  );
}