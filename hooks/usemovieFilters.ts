'use client';

import { useMemo, useState } from 'react';
import type { Movie, MovieGenre } from '@/lib/type';
export interface MovieFilters {
  searchTerm: string;
  selectedGenres: MovieGenre[];
  selectedType: 'all' | 'movie' | 'tv_series';
  itemsPerPage: number;
}
export function useMovieFilters(
  movies: Movie[],
  initialValues: Partial<MovieFilters> = {}
) {
  const [filters, setFilters] = useState<MovieFilters>({
    searchTerm: initialValues.searchTerm ?? '',
    selectedGenres: initialValues.selectedGenres ?? [],
    selectedType: initialValues.selectedType ?? 'all',
    itemsPerPage: initialValues.itemsPerPage ?? 20,
  });

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    /// search by title
    const searchTerm = filters.searchTerm.trim().toLowerCase();

    if (searchTerm) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }

    //// filter by selected genres
    if (filters.selectedGenres.length > 0) {
      result = result.filter((movie) =>
        filters.selectedGenres.every(
          (selected) =>
            movie.genres?.includes(selected.id) ||
            movie.genre_names?.includes(selected.name)
        )
      );
    }

    /// filter by title type
    if (filters.selectedType !== 'all') {
      result = result.filter(
        (movie) => movie.type === filters.selectedType
      );
    }

    //// limit results
    return result.slice(
      0,
      Math.max(1, filters.itemsPerPage)
    );
  }, [filters, movies]);

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedGenres: [],
      selectedType: 'all',
      itemsPerPage: 20,
    });
  };

  return {
    filters,
    setFilters,
    filteredMovies,
    clearFilters,
  };
}