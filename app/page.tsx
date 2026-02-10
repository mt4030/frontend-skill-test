'use client'
import HeroSection from "@/app/components/heroSection/herosection";
import GameList from "./components/gameSection/gamelist";



export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col">
        <HeroSection />

        <GameList />
      </main>
    </div>
  );
}
