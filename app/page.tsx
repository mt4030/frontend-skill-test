"use client";

import { useState, useEffect } from "react";
import { useGames } from "@/providers/context";
import HeroSection from "./components/heroSection/herosection";
import GameList from "./components/gameSection/gamelist";
import Loading from "./components/Loading";

export default function Home() {
  const { games, isLoading, error } = useGames();
  const [isDataReady, setIsDataReady] = useState<boolean>(false);

  // Simulating data fetch state
  useEffect(() => {
    if (!isLoading && games.length > 0) {
      setIsDataReady(true);
    }
  }, [games, isLoading]);

  // Show loading state if still fetching
  if (!isDataReady) {
    return <Loading />;
  }

  // Handle errors
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex flex-col">
      <HeroSection gamesList={games} />
      <GameList gamesList={games} />
    </main>
  );
}
