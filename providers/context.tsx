'use client';

import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

import { useRouter } from 'next/navigation';

import { useMe } from '@/hooks/useMe';
import { usePersistedState } from '@/lib/persistrdstate';

interface MovieContextType {
  favorite: number[];
  bookmark: number[];
  handleBookmark: (movieId: number) => void;
  handleFavorite: (movieId: number) => void;
}

interface MovieProviderProps {
  children: ReactNode;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: MovieProviderProps) {
  const [favorite, setFavorite] = usePersistedState<number[]>(
    'movie-favorites',
    []
  );

  const [bookmark, setBookmark] = usePersistedState<number[]>(
    'movie-bookmarks',
    []
  );

  const { data: user } = useMe();
  const router = useRouter();

  const toggleItem = (
    list: number[],
    setList: Dispatch<SetStateAction<number[]>>,
    movieId: number
  ) => {
    if (!user) {
      router.push('/login');
      return;
    }

    setList((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId]
    );
  };

  const handleBookmark = (movieId: number) => {
    toggleItem(bookmark, setBookmark, movieId);
  };

  const handleFavorite = (movieId: number) => {
    toggleItem(favorite, setFavorite, movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        favorite,
        bookmark,
        handleBookmark,
        handleFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMoviesContext(): MovieContextType {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error(
      'useMoviesContext must be used within a MovieProvider'
    );
  }

  return context;
}