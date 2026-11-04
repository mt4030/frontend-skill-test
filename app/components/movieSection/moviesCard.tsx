import Link from 'next/link';
import { Bookmark, Heart } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import type { MovieCardProps } from '@/lib/type';

const MovieCard = ({
  movie,
  isFavorite = false,
  isBookmarked = false,
  onFavorite,
  onBookmark,
}: MovieCardProps) => {
  const image = movie.poster || movie.backdrop;

  return (
    <Card className="relative w-full overflow-hidden rounded group bg-gray-900 border-gray-800">
      <div className="relative">
        <Link href={`/products/${movie.id}`}>
          <CardContent className="relative p-0">
            <div className="relative h-60 md:h-80 w-full bg-gray-800">
              {image ? (
                <img
                  src={image}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center text-gray-400">
                  {movie.title}
                </div>
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-black/10" />

              {movie.user_rating != null && (
                <div className="absolute left-3 top-3 rounded-full bg-amber-500 px-2 py-1 text-xs font-bold text-black">
                  {movie.user_rating.toFixed(1)}
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full p-3 text-white">
                <h3 className="text-sm font-semibold md:text-base line-clamp-2">
                  {movie.title}
                </h3>

                <p className="mt-1 text-xs text-gray-300">
                  {movie.year} · {movie.type === 'movie' ? 'Movie' : 'TV'}
                </p>
              </div>
            </div>
          </CardContent>
        </Link>

        {(onFavorite || onBookmark) && (
          <div className="absolute right-2 top-2 flex gap-2">
            {onFavorite && (
              <button
                type="button"
                onClick={onFavorite}
                aria-label="Toggle favorite"
                aria-pressed={isFavorite}
                className="rounded-full bg-black/70 p-2 text-white hover:text-red-400"
              >
                <Heart
                  size={18}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  className={isFavorite ? 'text-red-400' : ''}
                />
              </button>
            )}

            {onBookmark && (
              <button
                type="button"
                onClick={onBookmark}
                aria-label="Toggle watchlist"
                aria-pressed={isBookmarked}
                className="rounded-full bg-black/70 p-2 text-white hover:text-amber-400"
              >
                <Bookmark
                  size={18}
                  fill={isBookmarked ? 'currentColor' : 'none'}
                  className={isBookmarked ? 'text-amber-400' : ''}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MovieCard;