'use client';

import GameCarousel from './gamesCarousel';
import Link from 'next/link';
import {GameListProps,GenreMapItem } from '@/lib/type'


const GameList: React.FC<GameListProps> = ({ gamesList }) => {
  //  Get all unique genres
  const genreMap: Record<string, GenreMapItem> = {};
  gamesList.forEach((game:any) => {
    game.genres.forEach((genre:any) => {
      if (!genreMap[genre.slug]) {
        genreMap[genre.slug] = { id: genre.id, name: genre.name, games: [] };
      }
      genreMap[genre.slug].games.push(game);
    });
  });

  // Convert to array for mapping
  const gameCategories = Object.keys(genreMap).map((slug) => ({
    slug,
    id: genreMap[slug].id,
    name: genreMap[slug].name,
    games: genreMap[slug].games,
  }));

  return (
    <div className="space-y-8 px-5 md:px-10 bg-gray-800 pt-15 pb-20">
      {gameCategories.map((category) => (
        <div key={category.id}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl text-amber-50 font-bold capitalize hover:text-amber-300 transition-colors duration-300">
              {category.name}
            </h2>
            <Link
          
             href={`/products/category/${category.slug}`}
              className="text-sm border-2 p-1 md:text-base text-amber-300 hover:text-amber-50 font-semibold transition-colors"
            >
              See More
            </Link>
          </div>
          <GameCarousel gamesList={category.games} />
        </div>
      ))}
    </div>
  );
};

export default GameList;
