'use client';

import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, Search } from 'lucide-react';

import { useMovieSearch } from '@/hooks/useMovies';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function MovieSearch() {
  const pathname = usePathname();
  const router = useRouter();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 400);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    data: results = [],
    isFetching,
    error,
  } = useMovieSearch(debouncedSearch);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchTerm('');
    setShowSuggestions(false);
  }, [pathname]);

  const handleSuggestionClick = (id: number) => {
    setSearchTerm('');
    setShowSuggestions(false);
    router.push(`/products/${id}`);
  };

  const hasEnoughCharacters = debouncedSearch.trim().length >= 3;

  return (
    <div ref={wrapperRef} className="relative w-full md:mx-5 md:w-150 lg:w-200">
      <Card className="w-full border border-gray-800 bg-gray-900 shadow-lg">
        <CardContent className="relative p-2">
          <Search className="absolute right-4 top-4 z-10 h-5 w-5 text-white" />

          <Input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setShowSuggestions(false);
              }

              if (
                event.key === 'Enter' &&
                results.length > 0
              ) {
                handleSuggestionClick(results[0].id);
              }
            }}
            placeholder="Search movies and TV shows..."
            className="w-full border-0 bg-gray-800 pr-12 text-white focus-visible:ring-amber-500"
          />

          {isFetching && hasEnoughCharacters && (
            <Loader2 className="absolute right-12 top-4 h-4 w-4 animate-spin text-gray-400" />
          )}
        </CardContent>
      </Card>

      {showSuggestions && hasEnoughCharacters && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-gray-700 bg-gray-900 shadow-xl">
          {error && (
            <p className="p-4 text-sm text-red-400">
              Search failed. Please try again.
            </p>
          )}

          {!error && !isFetching && results.length === 0 && (
            <p className="p-4 text-sm text-gray-400">
              No titles found.
            </p>
          )}

          {results.map((movie) => (
            <button
              key={movie.id}
              type="button"
              onClick={() => handleSuggestionClick(movie.id)}
              className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-gray-800"
            >
              <img
                src={movie.image_url || '/img/icon.png'}
                alt=""
                className="h-12 w-10 rounded object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {movie.title}
                </p>

                <p className="text-xs text-gray-400">
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
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}