'use client'
import { useState, useEffect } from 'react';
import { useGames } from '@/providers/context';
import { useRouter } from 'next/navigation';
import Dropdown from './dropdown';
import { LiveSearchResults } from './LiveSearchResults';
import { SelectedFilters } from './SelectedFilters';
import { getUniqueGenres, getUniquePlatforms, getUniqueTags, filterLiveSearch } from '@/utils/adv-filters';
import { Genre, Platform, Tag, Game } from '@/lib/type';
import { Button } from '@/components/ui/button';
import { AdvancedGameFilterProps } from '@/lib/type';

export default function AdvancedGameFilter({ initialGenres = [], initialPlatforms = [], initialTags = [], initialSearch = '', onChange }: AdvancedGameFilterProps) {
  const { games } = useGames();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [liveSearchResults, setLiveSearchResults] = useState<Game[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<{ name: string }>({ name: '5' });

  const allGenres = getUniqueGenres(games);
  const allPlatforms = getUniquePlatforms(games);
  const allTags = getUniqueTags(games);

  // Init filters
  useEffect(() => {
    if (initialGenres.length) setSelectedGenres(allGenres.filter(g => initialGenres.includes(g.slug)));
    if (initialPlatforms.length) setSelectedPlatforms(allPlatforms.filter(p => initialPlatforms.includes(p.slug)));
    if (initialTags.length) setSelectedTags(allTags.filter(t => initialTags.includes(t.slug)));
  }, [initialGenres, initialPlatforms, initialTags]);

  useEffect(() => {
    setLiveSearchResults(searchTerm.trim().length < 3 ? [] : filterLiveSearch(games, searchTerm));
  }, [searchTerm, games]);

  const handleFilterSearch = () => {
    const query = new URLSearchParams();
    if (searchTerm.trim()) query.set('q', searchTerm.trim());
    if (selectedGenres.length) query.set('genres', selectedGenres.map(g => g.slug).join(','));
    if (selectedPlatforms.length) query.set('platforms', selectedPlatforms.map(p => p.slug).join(','));
    if (selectedTags.length) query.set('tags', selectedTags.map(t => t.slug).join(','));
    query.set('items', itemsPerPage.name);

    router.push(`/products/results?${query.toString()}`);
    onChange({ searchTerm: searchTerm.trim(), selectedGenres, selectedPlatforms, selectedTags, itemsPerPage: Number(itemsPerPage.name) });
  };

  return (
    <div className="text-white p-4 w-half md:mx-20 mx-2 bg-gray-950 mt-10 mb-20 rounded-3xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleFilterSearch()}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        {liveSearchResults.length > 0 && <LiveSearchResults results={liveSearchResults} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 items-end">
        <Dropdown label="Genres" data={allGenres} value={selectedGenres} multiple placeholder="Select genres" onChange={val => setSelectedGenres(val as Genre[])} />
        <Dropdown label="Platforms" data={allPlatforms} value={selectedPlatforms} multiple placeholder="Select platforms" onChange={val => setSelectedPlatforms(val as Platform[])} />
        <Dropdown label="Tags" data={allTags} value={selectedTags} multiple placeholder="Select tags" onChange={val => setSelectedTags(val as Tag[])} />
        <Dropdown label="Items per number" data={[{ name: '2' }, { name: '5' }, { name: '10' }, { name: '20' }]} value={itemsPerPage} placeholder="Select items" onChange={val => setItemsPerPage(val as { name: string })} />
      </div>

      <div className="mt-4">
        <Button onClick={handleFilterSearch} className="w-full px-8 py-3 rounded bg-amber-500 text-black hover:bg-amber-400 font-medium transition">
          Apply Filters
        </Button>
      </div>

      <SelectedFilters
        selectedGenres={selectedGenres}
        selectedPlatforms={selectedPlatforms}
        selectedTags={selectedTags}
        onRemoveGenre={slug => setSelectedGenres(prev => prev.filter(g => g.slug !== slug))}
        onRemovePlatform={slug => setSelectedPlatforms(prev => prev.filter(p => p.slug !== slug))}
        onRemoveTag={slug => setSelectedTags(prev => prev.filter(t => t.slug !== slug))}
      />
    </div>
  );
}
