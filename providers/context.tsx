'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/hooks/useMe';
import { fetchGames } from '../lib/api-calls';
import { Game, GameContextType, GameProviderProps } from "@/lib/type";
import { usePersistedState } from '@/lib/persistrdstate';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [games, setGames] = usePersistedState<Game[]>('games', []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorite, setFavorite] = usePersistedState<number[]>('favorites', []);
  const [bookmark, setBookmark] = usePersistedState<number[]>('bookmarks', []);

  const { data: user } = useMe();
  const router = useRouter();

  // ================= FETCH GAMES =================
  const fetchAndSaveGames = useCallback(async () => {
    try {
      const data = await fetchGames(200);
      setGames(data.results); // saved automatically to localStorage
      setIsLoading(false);
    } catch {
      setError('Failed to fetch games');
      setIsLoading(false);
    }
  }, [setGames]);

  // ================= INITIAL LOAD =================
  useEffect(() => {
    // if localStorage is empty, fetch from API
    if (!games || games.length === 0) {
      fetchAndSaveGames();
    } else {
      setIsLoading(false);
    }
  }, [fetchAndSaveGames, games]);

  // ================= TOGGLE HELPERS =================
  const toggleItem = (
    list: number[],
    setList: React.Dispatch<React.SetStateAction<number[]>>,
    gameId: number
  ) => {
    if (!user) {
      router.push('/login');
      return;
    }
    const updated = list.includes(gameId) ? list.filter(id => id !== gameId) : [...list, gameId];
    setList(updated); // automatically persists via usePersistedState
  };

  const handleBookmark = (gameId: number) => toggleItem(bookmark, setBookmark, gameId);
  const handleFavorite = (gameId: number) => toggleItem(favorite, setFavorite, gameId);

  // ================= CONTEXT VALUE =================
  const value: GameContextType = { games, isLoading, error, favorite, bookmark, handleBookmark, handleFavorite ,setGames};
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGames = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGames must be used within a GameProvider');
  return context;
};



