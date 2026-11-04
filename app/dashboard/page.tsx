'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import MovieCard from '../components/movieSection/moviesCard';
import Loading from '../components/Loading';
import { useMe } from '@/hooks/useMe';
import { useMoviesContext } from '@/providers/context';
import { fetchMovieDetails } from '@/lib/api-calls';

import type { Movie } from '@/lib/type';

export default function Dashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading } = useMe();

  const {
    favorite,
    bookmark,
    handleFavorite,
    handleBookmark,
  } = useMoviesContext();

  //// redirect unauthenticated users to login
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [isUserLoading, user, router]);

  //// fetch bookmarked titles
  const bookmarkedQueries = useQueries({
    queries: bookmark.map((id) => ({
      queryKey: ['movie', id],
      queryFn: () => fetchMovieDetails(id),
      enabled: Boolean(user),
    })),
  });

  //// Fetch favorite titles
  const favoriteQueries = useQueries({
    queries: favorite.map((id) => ({
      queryKey: ['movie', id],
      queryFn: () => fetchMovieDetails(id),
      enabled: Boolean(user),
    })),
  });

  //// extract successfully loaded movies
  const bookmarkedMovies = bookmarkedQueries
    .map((query) => query.data)
    .filter((movie): movie is Movie => movie !== undefined);

  const favoriteMovies = favoriteQueries
    .map((query) => query.data)
    .filter((movie): movie is Movie => movie !== undefined);

  //// loading states
  const isBookmarksLoading = bookmarkedQueries.some(
    (query) => query.isPending
  );

  const isFavoritesLoading = favoriteQueries.some(
    (query) => query.isPending
  );

  //// logout
  const handleLogout = () => {
    localStorage.removeItem('token');

    queryClient.setQueryData(['me'], null);

    router.replace('/');
  };

  // authentication loading or redirect
  if (isUserLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">

      {/* sidebar */}
      <aside className="w-full md:w-60 bg-gray-950 p-6 shrink-0 flex flex-col justify-between md:pb-25">

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Dashboard
          </h2>

          <p className="mb-2">
            Welcome, {user.firstName || 'Movie Lover'}!
          </p>
        </div>

        <div>
          <button
            onClick={() => router.push('/')}
            className="mb-4 w-full px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400"
          >
            Home
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-10">

        {/* watchlist */}
        <section>

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-xl font-bold">
              Watchlist
            </h3>

            <span className="text-gray-400 text-sm">
              {bookmark.length}{' '}
              {bookmark.length === 1 ? 'title' : 'titles'}
            </span>

          </div>

          {bookmark.length === 0 ? (
            <p className="text-gray-400">
              You haven't added any titles to your watchlist yet.
            </p>
          ) : isBookmarksLoading && bookmarkedMovies.length === 0 ? (
            <Loading />
          ) : bookmarkedMovies.length === 0 ? (
            <p className="text-gray-400">
              Unable to load your watchlist.
            </p>
          ) : (

            <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">

              {bookmarkedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-40 shrink-0 md:w-48"
                >
                  <MovieCard
                    movie={movie}
                    isFavorite={favorite.includes(movie.id)}
                    isBookmarked={true}
                    onFavorite={() => handleFavorite(movie.id)}
                    onBookmark={() => handleBookmark(movie.id)}
                  />
                </div>
              ))}

            </div>

          )}

        </section>

        {/* favorites */}
        <section>

          <div className="flex justify-between items-center mb-4">

            <h3 className="text-xl font-bold">
              Favorite Movies
            </h3>

            <span className="text-gray-400 text-sm">
              {favorite.length}{' '}
              {favorite.length === 1 ? 'title' : 'titles'}
            </span>

          </div>

          {favorite.length === 0 ? (
            <p className="text-gray-400">
              You haven't marked any titles as favorites yet.
            </p>
          ) : isFavoritesLoading && favoriteMovies.length === 0 ? (
            <Loading />
          ) : favoriteMovies.length === 0 ? (
            <p className="text-gray-400">
              Unable to load your favorite titles.
            </p>
          ) : (

            <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">

              {favoriteMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-40 shrink-0 md:w-48"
                >
                  <MovieCard
                    movie={movie}
                    isFavorite={true}
                    isBookmarked={bookmark.includes(movie.id)}
                    onFavorite={() => handleFavorite(movie.id)}
                    onBookmark={() => handleBookmark(movie.id)}
                  />
                </div>
              ))}

            </div>

          )}

        </section>

      </main>
    </div>
  );
}