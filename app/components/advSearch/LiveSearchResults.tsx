import Link from 'next/link';
import type { MovieSearchResult } from '@/lib/type';

interface LiveSearchProps {
  results: MovieSearchResult[];
}

export function LiveSearchResults({ results }: LiveSearchProps) {
  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded border border-gray-700 bg-gray-900">
      {results.map((movie) => (
        <Link
          key={movie.id}
          href={`/products/${movie.id}`}
          className="flex items-center gap-3 px-3 py-2 transition hover:bg-gray-800"
        >
          <img
            src={movie.image_url || '/img/icon.png'}
            alt=""
            className="h-10 w-10 rounded object-cover"
          />

          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">
              {movie.title}
            </span>

            <div className="mt-0.5 text-xs text-gray-400">
              {[
                movie.year,
                movie.type === 'movie'
                  ? 'Movie'
                  : movie.type === 'tv_series'
                    ? 'TV Show'
                    : movie.type,
              ]
                .filter(Boolean)
                .join(' · ')}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}