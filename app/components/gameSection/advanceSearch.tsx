"use client";

import { useState, useEffect } from "react";
import { mockGames } from "@/app/data/mockgames";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { useRouter } from "next/navigation";

interface Genre {
  slug: string;
  name: string;
}

interface AdvancedGameFilterProps {
  allGenres?: Genre[];
  initialGenres?: string[];
  initialSearch?: string;
}

export default function AdvancedGameFilter({
  allGenres: propGenres,
  initialGenres = [],
  initialSearch = "",
}: AdvancedGameFilterProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(initialGenres);
  const [ratingRange, setRatingRange] = useState<[number, number]>([1, 10]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [liveSearchResults, setLiveSearchResults] = useState<typeof mockGames>([]);

  const allGenres: Genre[] = propGenres ?? Array.from(
    new Map(mockGames.flatMap(g => g.genres).map(g => [g.slug, g])).values()
  );

  // LIVE SEARCH
  useEffect(() => {
    if (!searchTerm) return setLiveSearchResults([]);

    const results = mockGames.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setLiveSearchResults(results);
  }, [searchTerm]);

  // SEARCH BUTTON → Redirect to /result with query params
  const handleFilterSearch = () => {
    const query = new URLSearchParams();

    if (searchTerm) query.set("q", searchTerm);
    if (selectedGenres.length > 0) query.set("genres", selectedGenres.join(","));
    if (ratingRange[0] > 1 || ratingRange[1] < 10)
      query.set("rating", `${ratingRange[0]}-${ratingRange[1]}`);
     query.set("items", itemsPerPage.toString()); 

    router.push(`/products/results?${query.toString()}`);
  };

  // Toggle genres
  const toggleGenre = (slug: string) =>
    setSelectedGenres(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );

  const selectAllGenres = () => setSelectedGenres(allGenres.map(g => g.slug));
  const clearAllGenres = () => setSelectedGenres([]);

  return (
    <div className="text-white p-4 max-w-7xl mx-auto bg-gray-950 mt-20 rounded">
      {/* SEARCH INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {liveSearchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded mt-1 max-h-60 overflow-y-auto z-50">
            {liveSearchResults.map(game => (
              <a
                key={game.id}
                href={`/products/${game.id}`}
                className="block px-4 py-2 hover:bg-gray-700"
              >
                {game.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* FILTER DROPDOWNS */}
      <div className="flex flex-col md:flex-row gap-4 mt-4 items-center">
        {/* GENRES */}
        <div className="flex flex-col w-full md:w-1/3">
          <div className="flex justify-between mb-2 text-gray-300 text-sm">
            <span>Genres</span>
            <div className="flex gap-2">
              <button onClick={selectAllGenres} className="hover:underline text-xs">All</button>
              <button onClick={clearAllGenres} className="hover:underline text-xs">None</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-h-32 overflow-y-auto border border-gray-700 p-2 rounded">
            {allGenres.map(g => (
              <button
                key={g.slug}
                className={`px-2 py-1 text-xs rounded ${
                  selectedGenres.includes(g.slug)
                    ? "bg-amber-500 text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
                onClick={() => toggleGenre(g.slug)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* ITEMS PER PAGE */}
        <div className="w-full md:w-1/6">
          <Listbox value={itemsPerPage} onChange={setItemsPerPage}>
            <div className="relative">
              <ListboxButton className="w-full bg-gray-800 rounded px-3 py-2 flex justify-between items-center">
                {itemsPerPage} items
              </ListboxButton>
              <ListboxOptions className="absolute mt-1 w-full bg-gray-900 border border-gray-700 rounded z-50">
                {[2,5,10,20,50].map(num => (
                  <ListboxOption key={num} value={num} as="div" className="px-3 py-2 cursor-pointer hover:bg-gray-700">
                    {num} items
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>

        {/* RATING RANGE */}
        <div className="w-full md:w-1/4">
          <label className="text-sm mb-1 block">Rating {ratingRange[0]} - {ratingRange[1]}</label>
          <input type="range" min={1} max={10} value={ratingRange[0]} onChange={e => setRatingRange([Number(e.target.value), ratingRange[1]])} className="w-full" />
          <input type="range" min={1} max={10} value={ratingRange[1]} onChange={e => setRatingRange([ratingRange[0], Number(e.target.value)])} className="w-full mt-1" />
        </div>

        <button
          className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400 mt-2 md:mt-0"
          onClick={handleFilterSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
