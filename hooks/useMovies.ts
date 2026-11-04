'use client';

import { useQuery } from '@tanstack/react-query';

import {
  fetchHomeMovies,
  fetchMovies,
  fetchMovieDetails,
  fetchMovieGenres,
  searchMoviesLive,
} from '@/lib/api-calls';

import type { MovieListParams } from '@/lib/type';

export function useHomeMovies() {
  return useQuery({
    queryKey: ['home-movies'],
    queryFn: fetchHomeMovies,
    staleTime: 60 * 60 * 1000,
  });
}

export function useMovies(params: MovieListParams = {}) {
  return useQuery({
    queryKey: ['movies', params],
    queryFn: () => fetchMovies(params),
    staleTime: 30 * 60 * 1000,
  });
}

export function useMovieSearch(searchTerm: string) {
  const query = searchTerm.trim();

  return useQuery({
    queryKey: ['movie-search', query],
    queryFn: () => searchMoviesLive(query),
    enabled: query.length >= 3,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMovieDetails(id: number | undefined) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: id !== undefined && Number.isInteger(id) && id > 0,
    staleTime: 60 * 60 * 1000,
  });
}

export function useMovieGenres() {
  return useQuery({
    queryKey: ['movie-genres'],
    queryFn: fetchMovieGenres,
    staleTime: 24 * 60 * 60 * 1000,
  });
}