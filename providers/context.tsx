'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/hooks/useMe';
import { fetchGames } from '../lib/api-calls';


// ================= TYPES =================

interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
}

interface GameContextType {
  games: Game[];
  isLoading: boolean;
  error: string | null;

  favorite: number[];
  bookmark: number[];

  handleBookmark: (gameId: number) => void;
  handleFavorite: (gameId: number) => void;
}

interface GameProviderProps {
  children: ReactNode;
}


// ================= CONTEXT =================

const GameContext = createContext<GameContextType | undefined>(undefined);


// ================= PROVIDER =================

export const GameProvider = ({ children }: GameProviderProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [favorite, setFavorite] = useState<number[]>([]);
  const [bookmark, setBookmark] = useState<number[]>([]);

  const { data: user } = useMe();
  const router = useRouter();


  // ================= FETCH GAMES =================

  const fetchAndSaveGames = useCallback(async () => {
    try {
      const data = await fetchGames(200);
      setGames(data.results);

      localStorage.setItem('games', JSON.stringify(data.results));
      localStorage.setItem('gamesTime', String(Date.now()));

      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch games');
      setIsLoading(false);
    }
  }, []);


  // ================= INITIAL LOAD =================

  useEffect(() => {
    const cachedData = localStorage.getItem('games');
    const cachedTime = localStorage.getItem('gamesTime');
    const now = Date.now();

    if (
      cachedData &&
      cachedTime &&
      now - Number(cachedTime) < 1000 * 60 * 60 * 6
    ) {
      setGames(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      fetchAndSaveGames();
    }

    // Load saved bookmarks & favorites
    const savedBookmarks = localStorage.getItem('bookmarks');
    const savedFavorites = localStorage.getItem('favorites');

    if (savedBookmarks) setBookmark(JSON.parse(savedBookmarks));
    if (savedFavorites) setFavorite(JSON.parse(savedFavorites));
  }, [fetchAndSaveGames]);


  // ================= TOGGLE HELPERS =================

  const toggleItem = (
    list: number[],
    setList: React.Dispatch<React.SetStateAction<number[]>>,
    key: string,
    gameId: number
  ) => {
    if (!user) {
      router.push('/login');
      return;
    }

    const updated = list.includes(gameId)
      ? list.filter((id) => id !== gameId)
      : [...list, gameId];

    setList(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };


  const handleBookmark = (gameId: number) => {
    toggleItem(bookmark, setBookmark, 'bookmarks', gameId);
  };

  const handleFavorite = (gameId: number) => {
    toggleItem(favorite, setFavorite, 'favorites', gameId);
  };


  // ================= CONTEXT VALUE =================

  const value: GameContextType = {
    games,
    isLoading,
    error,
    favorite,
    bookmark,
    handleBookmark,
    handleFavorite,
  };


  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};


// ================= HOOK =================

export const useGames = (): GameContextType => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGames must be used within a GameProvider');
  }

  return context;
};
