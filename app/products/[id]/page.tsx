
'use client';

import { use } from 'react';

import {
  Heart,
  Bookmark,
  Clock,
  Film,
  Tv,
  CalendarDays,
} from 'lucide-react';

import { useMovieDetails } from '@/hooks/useMovies';
import { useMoviesContext } from '@/providers/context';

import MovieError from './movieError';
import AppImage from '@/app/components/AppImage';
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);

  const movieId = Number(id);

  const isValidId =
    Number.isSafeInteger(movieId) && movieId > 0;

  /// fetch movie details through tanstack
  const {
    data: movie,
    isLoading,
    isError,
  } = useMovieDetails(isValidId ? movieId : undefined);


  const {
    handleBookmark,
    handleFavorite,
    favorite,
    bookmark,
  } = useMoviesContext();

  if (!isValidId) {
    return <MovieError />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading movie details...
      </div>
    );
  }

  if (isError || !movie) {
    return <MovieError />;
  }

  const isFavorited = favorite.includes(movie.id);
  const isBookmarked = bookmark.includes(movie.id);
  const backdrop = movie.backdrop || movie.poster;
  const poster = movie.poster || movie.backdrop;

  const isTvShow = movie.type.startsWith('tv_');

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-900 pb-16 text-white">


    <div className="relative h-[50vh] w-full overflow-hidden bg-gray-950">
  <AppImage
    src={movie.backdrop || movie.poster}
    aspect="landscape"
    alt={movie.title}
    className="h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black/60 to-black/20" />
</div>

  
      <div className="relative z-10 mx-auto -mt-32 max-w-6xl px-4 md:-mt-60">

        <div className="flex flex-col gap-8 md:flex-row md:gap-10">

     
         <div className="w-full shrink-0 md:w-80 lg:w-96">
  <AppImage
    src={movie.poster || movie.backdrop}
    aspect="portrait"
    alt={movie.title}
    className="mx-auto max-h-[550px] w-full rounded-xl object-cover shadow-2xl"
  />
</div>
      
          <div className="flex flex-1 flex-col gap-5">

            <div>
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                {movie.title}
              </h1>

              {movie.original_title &&
                movie.original_title !== movie.title && (
                  <p className="mt-2 text-sm text-gray-400">
                    Original title: {movie.original_title}
                  </p>
                )}
            </div>

     
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">

              <span className="flex items-center gap-2">
                <CalendarDays size={17} />

                {movie.release_date || movie.year || 'Release date unavailable'}
              </span>

              <span className="rounded bg-gray-800 px-3 py-1">
                Age rating: {movie.us_rating || 'N/A'}
              </span>

            </div>

       
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">

              {movie.user_rating != null && (
                <span className="font-semibold text-amber-400">
                  ★ {movie.user_rating.toFixed(1)}/10
                </span>
              )}

              {movie.critic_score != null && (
                <span>
                  Critic score: {movie.critic_score}/100
                </span>
              )}

              {movie.runtime_minutes != null && (
                <span className="flex items-center gap-2">
                  <Clock size={17} />
                  {movie.runtime_minutes} min
                </span>
              )}

              <span className="flex items-center gap-2">
                {isTvShow ? <Tv size={17} /> : <Film size={17} />}

                {isTvShow ? 'TV Show' : 'Movie'}
              </span>

              {movie.end_year != null && (
                <span>
                  {movie.year}–{movie.end_year}
                </span>
              )}

            </div>

       
            {movie.genre_names && movie.genre_names.length > 0 && (
              <div className="flex flex-wrap gap-2">

                {movie.genre_names.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-black"
                  >
                    {genre}
                  </span>
                ))}

              </div>
            )}

         
            <div className="mt-2">

              <h2 className="mb-3 text-xl font-bold">
                Overview
              </h2>

              <p className="leading-relaxed text-gray-300">
                {movie.plot_overview ||
                  'No plot overview is available for this title.'}
              </p>

            </div>

   
            {movie.review_summary && (
              <div>
                <h2 className="mb-2 text-xl font-bold">
                  Review Summary
                </h2>

                <p className="leading-relaxed text-gray-300">
                  {movie.review_summary}
                </p>
              </div>
            )}

       
            <div className="mt-4 flex flex-wrap gap-4">

              <button
                type="button"
                onClick={() => handleFavorite(movie.id)}
                aria-pressed={isFavorited}
                className={`inline-flex items-center gap-2 rounded border px-6 py-2 transition ${
                  isFavorited
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-gray-500 hover:bg-gray-800'
                }`}
              >
                <Heart
                  size={18}
                  fill={isFavorited ? 'currentColor' : 'none'}
                />

                {isFavorited ? 'Favorited' : 'Favorite'}
              </button>

              <button
                type="button"
                onClick={() => handleBookmark(movie.id)}
                aria-pressed={isBookmarked}
                className={`inline-flex items-center gap-2 rounded border px-6 py-2 transition ${
                  isBookmarked
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-500 hover:bg-gray-800'
                }`}
              >
                <Bookmark
                  size={18}
                  fill={isBookmarked ? 'currentColor' : 'none'}
                />

                {isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
