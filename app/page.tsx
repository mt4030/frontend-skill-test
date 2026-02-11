'use client';

import { useGames } from '@/providers/context';
import HeroSection from './components/heroSection/herosection';
import GameList from './components/gameSection/gamelist';

export default function Home() {
  const { games, isLoading, error } = useGames();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
 ///landing - home page
      <main className="flex flex-col">
        <HeroSection gamesList={games} />
        <GameList gamesList={games} />
      </main>
 
  );
}
