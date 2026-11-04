
'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import AdvancedMovieFilter from '@/app/components/advSearch/advanceSearch';
import MovieCard from '@/app/components/movieSection/moviesCard';
import Loading from '@/app/components/Loading';

import {
  useHomeMovies,
  useMovieGenres,
  useMovieSearch,
} from '@/hooks/useMovies';

import { fetchMovies } from '@/lib/api-calls';

interface Props {
  searchParams: {
    q?: string;
    genres?: string;
    type?: string;
    items?: string;
    page?: string;
  };
}

export default function ResultsClient({ searchParams }: Props) {
  const router = useRouter();


///use parameters
  const searchTerm = searchParams.q?.trim() ?? '';
  const isSearchMode = searchTerm.length > 0;

  const genreIds = (searchParams.genres ?? '')
    .split(',')
    .map(Number)
    .filter((id) => Number.isSafeInteger(id) && id > 0);

  const genresParam = genreIds.join(',');

  const selectedType =
    searchParams.type === 'movie' ||
    searchParams.type === 'tv_series'
      ? searchParams.type
      : 'all';

  const requestedItems = Number(searchParams.items ?? 20);

  const itemsPerPage = [10, 20, 40].includes(requestedItems)
    ? requestedItems
    : 20;

  const requestedPage = Number(searchParams.page ?? 1);

  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;


///initial 100 movies
  const {
    data: homeMovies = [],
    isLoading: isHomeLoading,
    isError: isHomeError,
  } = useHomeMovies();


///genres
  const {
    data: genres = [],
  } = useMovieGenres();

  const initialGenreSlugs = genres
    .filter((genre) => genreIds.includes(genre.id))
    .map((genre) => genre.slug);


//check available data from metadata
  const homeHasGenreMetadata =
    homeMovies.length > 0 &&
    homeMovies.every(
      (movie) =>
        Array.isArray(movie.genres) ||
        Array.isArray(movie.genre_names)
    );


//loccal filtring
  const locallyFilteredMovies = useMemo(() => {
    let result = [...homeMovies];

    // Filter by movie type
    if (selectedType !== 'all') {
      result = result.filter(
        (movie) => movie.type === selectedType
      );
    }

    // Filter by genre 
    if (genreIds.length > 0 && homeHasGenreMetadata) {
      result = result.filter((movie) =>
        genreIds.every((genreId) => {
          const genreName = genres.find(
            (genre) => genre.id === genreId
          )?.name;

          const matchesGenreId =
            movie.genres?.includes(genreId) ?? false;

          const matchesGenreName =
            genreName !== undefined &&
            (movie.genre_names?.includes(genreName) ?? false);

          return matchesGenreId || matchesGenreName;
        })
      );
    }

    return result;
  }, [
    homeMovies,
    selectedType,
    genreIds,
    homeHasGenreMetadata,
    genres,
  ]);


///remote genre fallback


  const shouldFetchRemoteBrowse =
    !isSearchMode &&
    !isHomeLoading &&
    genreIds.length > 0 &&
    !homeHasGenreMetadata;

  const {
    data: remoteMovieData,
    isLoading: isRemoteLoading,
    isError: isRemoteError,
  } = useQuery({
    queryKey: [
      'movie-results',
      itemsPerPage,
      currentPage,
      selectedType,
      genresParam,
    ],

    queryFn: () =>
      fetchMovies({
        limit: itemsPerPage,
        page: currentPage,
        types:
          selectedType === 'all'
            ? 'movie,tv_series'
            : selectedType,
        genres: genresParam,
      }),

    enabled: shouldFetchRemoteBrowse,

    staleTime: 30 * 60 * 1000,
  });

///tittle search

  const {
    data: searchResults = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useMovieSearch(searchTerm);

  const filteredSearchResults = searchResults.filter((movie) => {
    if (selectedType === 'all') {
      return true;
    }

    return movie.type === selectedType;
  });


///browser result
  const remoteMovies = remoteMovieData?.titles ?? [];

  const browseMovies = shouldFetchRemoteBrowse
    ? remoteMovies
    : locallyFilteredMovies;

  const totalResults = shouldFetchRemoteBrowse
    ? remoteMovieData?.total_results ?? remoteMovies.length
    : locallyFilteredMovies.length;

  const totalPages =
    shouldFetchRemoteBrowse &&
    remoteMovieData?.total_results === undefined
      ? undefined
      : Math.max(1, Math.ceil(totalResults / itemsPerPage));


  const displayedMovies = shouldFetchRemoteBrowse
    ? remoteMovies
    : locallyFilteredMovies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const hasNextPage = shouldFetchRemoteBrowse
    ? totalPages !== undefined
      ? currentPage < totalPages
      : remoteMovies.length === itemsPerPage
    : currentPage < (totalPages ?? 1);


//loading and error status

  const isLoading = isSearchMode
    ? isSearchLoading
    : shouldFetchRemoteBrowse
      ? isRemoteLoading
      : isHomeLoading;

  const hasError = isSearchMode
    ? isSearchError
    : shouldFetchRemoteBrowse
      ? isRemoteError
      : isHomeError;


  /// pagination nav


  const changePage = (page: number) => {
    if (page < 1) return;

    const params = new URLSearchParams();

    if (searchParams.q) {
      params.set('q', searchParams.q);
    }

    if (searchParams.genres) {
      params.set('genres', searchParams.genres);
    }

    if (searchParams.type) {
      params.set('type', searchParams.type);
    }

    params.set('items', String(itemsPerPage));
    params.set('page', String(page));

    router.push(`/products/results?${params.toString()}`);
  };


  return (
    <main className="mx-auto min-h-screen max-w-7xl p-4">

      <AdvancedMovieFilter
        initialSearch={searchTerm}
        initialGenres={initialGenreSlugs}
        initialType={selectedType}
        genres={genres}
      />

      <div className="mb-6 mt-10 flex flex-wrap items-center justify-between gap-3">

        <h1 className="text-2xl font-bold text-white md:text-3xl">
          {isSearchMode
            ? 'Search Results'
            : 'Discover Movies & TV Shows'}
        </h1>

        <p className="text-sm text-gray-400">
          {isSearchMode
            ? `${filteredSearchResults.length} suggestions`
            : `${totalResults} titles`}
        </p>

      </div>

      {isSearchMode && genreIds.length > 0 && (
        <p className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-300">
          Genre filtering is not combined with title autocomplete.
          Remove the search term to browse by genre.
        </p>
      )}

      {isLoading && <Loading />}

      {hasError && (
        <div className="py-16 text-center text-red-400">
          Failed to load results. Please try again.
        </div>
      )}

      {/* search resultas */}

      {!isLoading && !hasError && isSearchMode && (
        <>
          {filteredSearchResults.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              {searchTerm.length < 3
                ? 'Enter at least three characters to search.'
                : 'No matching titles found.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

              {filteredSearchResults.map((movie) => (
                <a
                  key={movie.id}
                  href={`/products/${movie.id}`}
                  className="group overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-amber-900/30"
                >
                  <div className="relative aspect-2/3 overflow-hidden bg-gray-950">

                    {movie.image_url ? (
                      <img
                        src={movie.image_url}
                        alt={movie.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-4 text-center text-gray-400">
                        {movie.title}
                      </div>
                    )}

                  </div>

                  <div className="p-4">

                    <h2 className="line-clamp-2 text-base font-semibold text-white transition-colors group-hover:text-amber-400">
                      {movie.title}
                    </h2>

                    <p className="mt-2 text-xs text-gray-400">
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
                </a>
              ))}

            </div>
          )}
        </>
      )}

      {/* browser result */}

      {!isLoading && !hasError && !isSearchMode && (
        <>
          {displayedMovies.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              No titles found with these filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

              {displayedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}

            </div>
          )}

          {/* pagination */}

          <div className="mt-16 flex items-center justify-center gap-4">

            <button
              type="button"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
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
              onClick={() => changePage(currentPage + 1)}
              disabled={!hasNextPage || isLoading}
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
