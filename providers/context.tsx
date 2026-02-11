'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { fetchGames } from '../lib/api-calls';

// Define the Game type according to the data you expect
interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  // Add more fields from the API response here
}

// Define the shape of the context value
interface GameContextType {
  games: Game[];
  isLoading: boolean;
  error: string | null;
}

// Create context with the correct type
const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

const [favorite,setFavorite]=useState()
const [bookmark,setBoomark]=useState()

const handlebookmark=()=>{

}
const handlefavorite=()=>{
  ////if log in if not redirect
}


  // Check if the data is in localStorage
  useEffect(() => {
    const cachedData = localStorage.getItem('games');
    const cachedTime = localStorage.getItem('gamesTime');
    const currentTime = Date.now();

    if (cachedData && cachedTime && currentTime - Number(cachedTime) < 1000 * 60 * 60 * 6) {
      setGames(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      fetchAndSaveGames();
    }
  }, []);

  const fetchAndSaveGames = async () => {
    try {
      const data = await fetchGames(200); // Fetch data (API call)
      setGames(data.results);
      localStorage.setItem('games', JSON.stringify(data.results));
      localStorage.setItem('gamesTime', String(Date.now()));
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch games');
      setIsLoading(false);
    }
  };

  const value: GameContextType = {
    games,
    isLoading,
    error,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGames = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGames must be used within a GameProvider');
  }
  return context;
};
