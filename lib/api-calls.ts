
import axios from 'axios';

import type {
  Movie,
  MovieGenre,
  MovieListParams,
  MovieSearchResult,
  WatchmodeAutocompleteResponse,
  WatchmodeGenre,
  WatchmodeListResponse,
} from '@/lib/type';

// ======================================
// HOMEPAGE
// ======================================

export async function fetchHomeMovies(): Promise<Movie[]> {
  const response = await axios.get<Movie[]>('/api/home');

  return response.data;
}

// ======================================
// MOVIE LIST
// ======================================

export async function fetchMovies(
  params: MovieListParams = {}
): Promise<WatchmodeListResponse> {
  const response = await axios.get<WatchmodeListResponse>(
    '/api/title',
    {
      params,
    }
  );

  return response.data;
}

// ======================================
// LIVE SEARCH
// ======================================

export async function searchMoviesLive(
  input: string
): Promise<MovieSearchResult[]> {
  const query = input.trim();

  if (query.length < 3) {
    return [];
  }

  const response = await axios.get<WatchmodeAutocompleteResponse>(
    '/api/search',
    {
      params: {
        q: query,
      },
    }
  );

  return response.data.results.map((item) => ({
    id: item.id,
    title: item.name,
    year: item.year ?? null,
    type: item.type ?? null,
    image_url: item.image_url ?? null,
  }));
}

// ======================================
// MOVIE DETAILS
// ======================================

export async function fetchMovieDetails(
  id: number
): Promise<Movie> {
  const response = await axios.get<Movie>(
    `/api/title/${id}`
  );

  return response.data;
}



//genres

function slugifyGenre(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function fetchMovieGenres(): Promise<MovieGenre[]> {
  const response = await axios.get<WatchmodeGenre[]>(
    '/api/genres'
  );

  return response.data.map((genre) => ({
    id: genre.id,
    name: genre.name,
    slug: slugifyGenre(genre.name),
  }));
}
