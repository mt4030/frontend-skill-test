import 'server-only';

import type {
  Movie,
  WatchmodeAutocompleteResponse,
  WatchmodeGenre,
  WatchmodeListResponse,
  MovieListParams,
} from '@/lib/type';

const BASE_URL = 'https://api.watchmode.com/v1';

type QueryParams = Record<string, string | number | undefined>;

async function watchmodeFetch<T>(
  endpoint: string,
  params: QueryParams = {},
  revalidate = 3600
): Promise<T> {
  const apiKey = process.env.WATCHMODE_API_KEY;

  if (!apiKey) {
    throw new Error('WATCHMODE_API_KEY is not configured');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set('apiKey', apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const options: RequestInit & {
    next?: { revalidate: number };
  } =
    revalidate === 0
      ? { cache: 'no-store' }
      : { next: { revalidate } };

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    throw new Error(`Watchmode API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export function getTitles(
  params: MovieListParams = {}
): Promise<WatchmodeListResponse> {
  return watchmodeFetch<WatchmodeListResponse>(
    '/list-titles/',
    {
      limit: params.limit ?? 40,
      page: params.page ?? 1,
      types: params.types ?? 'movie,tv_series',
      sort_by: params.sort_by ?? 'popularity_desc',
      genres: params.genres,
    },
    86400
  );
}

export function autocompleteTitles(
  searchValue: string,
  searchType = 2
): Promise<WatchmodeAutocompleteResponse> {
  return watchmodeFetch<WatchmodeAutocompleteResponse>(
    '/autocomplete-search/',
    {
      search_value: searchValue,
      search_type: searchType,
    },
    0
  );
}

export function getTitleDetails(
  titleId: number | string
): Promise<Movie> {
  return watchmodeFetch<Movie>(
    `/title/${encodeURIComponent(String(titleId))}/details/`,
    {},
    86400
  );
}

export function getGenres(): Promise<WatchmodeGenre[]> {
  return watchmodeFetch<WatchmodeGenre[]>('/genres/', {}, 86400);
}

/**
 * The list endpoint gives us title IDs and basic information.
 * Fetch details only for a small homepage selection so that
 * the existing poster/backdrop design can still work.
 */
export async function getHomeMovies(): Promise<Movie[]> {
  const { titles } = await getTitles({
    limit: 100,
    page: 1,
    types: 'movie,tv_series',
    sort_by: 'popularity_desc',
  });

  const details = await Promise.allSettled(
    titles.map((title) => getTitleDetails(title.id))
  );

  return details
    .filter(
      (result): result is PromiseFulfilledResult<Movie> =>
        result.status === 'fulfilled'
    )
    .map((result) => result.value);
}