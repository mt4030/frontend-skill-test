'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';

import Dropdown from './dropdown';
import { LiveSearchResults } from './LiveSearchResults';
import { SelectedFilters } from './SelectedFilters';

import { Button } from '@/components/ui/button';

import {
  useMovieGenres,
  useMovieSearch,
} from '@/hooks/useMovies';

import type { MovieGenre } from '@/lib/type';

interface MovieTypeOption {
  name: string;
  value: 'all' | 'movie' | 'tv_series';
}

interface ItemsOption {
  name: string;
}

interface AdvancedMovieFilterProps {
  initialGenres?: string[];
  initialType?: 'all' | 'movie' | 'tv_series';
  initialSearch?: string;
  genres?: MovieGenre[];
  onChange?: (filters: {
    searchTerm: string;
    selectedGenres: MovieGenre[];
    selectedType: string;
    itemsPerPage: number;
  }) => void;
}

const EMPTY_GENRES: string[] = [];

const movieTypes: MovieTypeOption[] = [
  { name: 'All', value: 'all' },
  { name: 'Movies', value: 'movie' },
  { name: 'TV Shows', value: 'tv_series' },
];

const itemsOptions: ItemsOption[] = [
  { name: '10' },
  { name: '20' },
  { name: '40' },
];

export default function AdvancedMovieFilter({
  initialGenres = EMPTY_GENRES,
  initialType = 'all',
  initialSearch = '',
  genres: providedGenres,
  onChange,
}: AdvancedMovieFilterProps) {
  const router = useRouter();

  // Search input
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const [debouncedSearch] = useDebounce(searchTerm, 400);

  // Selected filters
  const [selectedGenres, setSelectedGenres] = useState<MovieGenre[]>([]);

  const [selectedType, setSelectedType] =
    useState<MovieTypeOption>(movieTypes[0]);

  const [itemsPerPage, setItemsPerPage] = useState<ItemsOption>({
    name: '20',
  });

  // Fetch available Watchmode genres
  const {
    data: fetchedGenres = [],
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useMovieGenres();

  // Allow genres to be supplied by a parent, but fetch them automatically otherwise.
  const availableGenres = providedGenres ?? fetchedGenres;

  // Live autocomplete
  const {
    data: liveSearchResults = [],
    isFetching: isSearchLoading,
  } = useMovieSearch(debouncedSearch);

  // Restore initial genre selections after genres are loaded
  const initialGenreKey = initialGenres.join(',');

  useEffect(() => {
    setSelectedGenres(
      availableGenres.filter((genre) =>
        initialGenres.includes(genre.slug)
      )
    );
  }, [initialGenreKey, availableGenres]);

  // Restore initial type
  useEffect(() => {
    const type =
      movieTypes.find((item) => item.value === initialType) ??
      movieTypes[0];

    setSelectedType(type);
  }, [initialType]);

  // Restore initial search
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  // Apply filters
  const handleFilterSearch = () => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set('q', searchTerm.trim());
    }

    if (selectedGenres.length > 0) {
      params.set(
        'genres',
        selectedGenres.map((genre) => genre.id).join(',')
      );
    }

    if (selectedType.value !== 'all') {
      params.set('type', selectedType.value);
    }

    params.set('items', itemsPerPage.name);

    router.push(`/products/results?${params.toString()}`);

    onChange?.({
      searchTerm: searchTerm.trim(),
      selectedGenres,
      selectedType: selectedType.value,
      itemsPerPage: Number(itemsPerPage.name),
    });
  };

  // Remove selected genre
  const handleRemoveGenre = (slug: string) => {
    setSelectedGenres((current) =>
      current.filter((genre) => genre.slug !== slug)
    );
  };

  // Reset selected type
  const handleRemoveType = () => {
    setSelectedType(movieTypes[0]);
  };

  return (
    <div className="mx-2 mb-20 mt-10 w-full rounded-3xl bg-gray-950 p-4 text-white md:mx-20 md:w-auto md:p-6">

      {/* Search */}
      <div className="relative">

        <input
          type="text"
          placeholder="Search movies and TV shows..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleFilterSearch();
            }
          }}
          className="w-full rounded bg-gray-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber-500"
        />

        {isSearchLoading && debouncedSearch.length >= 3 && (
          <span className="absolute right-4 top-3 text-xs text-gray-400">
            Searching...
          </span>
        )}

        {debouncedSearch.trim().length >= 3 &&
          liveSearchResults.length > 0 && (
            <LiveSearchResults results={liveSearchResults} />
          )}

      </div>

      {/* Dropdown filters */}
      <div className="mt-6 grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-3">

        {/* Genres */}
        <div>
          {isGenresLoading ? (
            <p className="text-sm text-gray-400">
              Loading genres...
            </p>
          ) : isGenresError ? (
            <p className="text-sm text-red-400">
              Failed to load genres.
            </p>
          ) : (
            <Dropdown
              label="Genres"
              data={availableGenres}
              value={selectedGenres}
              multiple
              placeholder="Select genres"
              onChange={(value) => {
                if (Array.isArray(value)) {
                  setSelectedGenres(value as MovieGenre[]);
                }
              }}
            />
          )}
        </div>

        {/* Movie type */}
        <Dropdown
          label="Type"
          data={movieTypes}
          value={selectedType}
          placeholder="Select type"
          onChange={(value) => {
            if (!Array.isArray(value)) {
              setSelectedType(value as MovieTypeOption);
            }
          }}
        />

        {/* Items per page */}
        <Dropdown
          label="Items per page"
          data={itemsOptions}
          value={itemsPerPage}
          placeholder="Select items"
          onChange={(value) => {
            if (!Array.isArray(value)) {
              setItemsPerPage(value as ItemsOption);
            }
          }}
        />

      </div>

      {/* Apply */}
      <div className="mt-5">
        <Button
          onClick={handleFilterSearch}
          className="w-full rounded bg-amber-500 px-8 py-3 font-medium text-black transition hover:bg-amber-400"
        >
          Apply Filters
        </Button>
      </div>

      {/* Selected filters */}
      <SelectedFilters
        selectedGenres={selectedGenres}
        selectedType={selectedType.value}
        onRemoveGenre={handleRemoveGenre}
        onRemoveType={handleRemoveType}
      />

    </div>
  );
}