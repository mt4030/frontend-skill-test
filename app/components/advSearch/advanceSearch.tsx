'use client'

import { useState, useEffect } from 'react'
import { useGames } from '@/providers/context'
import { useRouter } from 'next/navigation'
import Dropdown from './dropdown'
import Link from 'next/link'
import { Genre, Platform, Tag, Filters, Game } from '@/lib/type';

interface AdvancedGameFilterProps {
  initialGenres?: string[];
  initialPlatforms?: string[];
  initialTags?: string[];
  initialSearch?: string;
  onChange: (filters: Filters) => void;
}


export default function AdvancedGameFilter({
  initialGenres = [],
  initialPlatforms = [],
  initialTags = [],
  initialSearch = '',
  onChange
}: AdvancedGameFilterProps) {
  const { games } = useGames()
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [liveSearchResults, setLiveSearchResults] = useState<Game[]>([])
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [itemsPerPage, setItemsPerPage] = useState<{ name: string }>({ name: '5' })

  // Extract unique genres from all games
  const allGenres: Genre[] = Array.from(
    new Map(
      games
        .flatMap(game => game.genres || [])
        .map(genre => [genre.slug, { id: genre.id, slug: genre.slug, name: genre.name }])
    ).values()
  )

  // Extract unique platforms from all games
  const allPlatforms: Platform[] = Array.from(
    new Map(
      games
        .flatMap(game => game.platforms || [])
        .map(p => [p.platform.slug, { id: p.platform.id, slug: p.platform.slug, name: p.platform.name }])
    ).values()
  )

  // Extract unique tags from all games
  const allTags: Tag[] = Array.from(
    new Map(
      games
        .flatMap(game => game.tags || [])
        .map(tag => [tag.slug, { id: tag.id, slug: tag.slug, name: tag.name }])
    ).values()
  )

  // Initialize selected filters
  useEffect(() => {
    if (initialGenres.length && allGenres.length) {
      setSelectedGenres(allGenres.filter(g => initialGenres.includes(g.slug)))
    }
    if (initialPlatforms.length && allPlatforms.length) {
      setSelectedPlatforms(allPlatforms.filter(p => initialPlatforms.includes(p.slug)))
    }
    if (initialTags.length && allTags.length) {
      setSelectedTags(allTags.filter(t => initialTags.includes(t.slug)))
    }
  }, [initialGenres, initialPlatforms, initialTags])

  // Live search
  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setLiveSearchResults([])
      return
    }
    const results = games.filter(g =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setLiveSearchResults(results.slice(0, 5))
  }, [searchTerm, games])

  const handleFilterSearch = () => {
    const query = new URLSearchParams()
    
    if (searchTerm.trim()) query.set('q', searchTerm.trim())
    if (selectedGenres.length) query.set('genres', selectedGenres.map(g => g.slug).join(','))
    if (selectedPlatforms.length) query.set('platforms', selectedPlatforms.map(p => p.slug).join(','))
    if (selectedTags.length) query.set('tags', selectedTags.map(t => t.slug).join(','))
    query.set('items', itemsPerPage.name)

    router.push(`/products/results?${query.toString()}`)

    onChange({
      searchTerm: searchTerm.trim(),
      selectedGenres,
      selectedPlatforms,
      selectedTags,
      itemsPerPage: Number(itemsPerPage.name)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFilterSearch()
    }
  }

  return (
    <div className="text-white p-4  w-half md:mx-20 mx-2  bg-gray-950 mt-10 mb-20 rounded-3xl ">
      {/* SEARCH INPUT */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        {liveSearchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded mt-1 z-50 max-h-60 overflow-y-auto">
            {liveSearchResults.map(game => (
               
              <Link  key={game.id}  href={`/products/${game.id}`} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 transition">
                <img 
                  src={game.background_image} 
                  alt={game.name}
                  className="w-10 h-10 rounded object-cover" 
                />
                <div className="flex-1">
                  <span className="text-sm font-medium">{game.name}</span>
                  {game.genres && game.genres.length > 0 && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      {game.genres.slice(0, 2).map((g: any) => g.name).join(', ')}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 items-end">
        <Dropdown
          label="Genres"
          data={allGenres}
          value={selectedGenres}
          multiple
          placeholder="Select genres"
          onChange={val => setSelectedGenres(val as Genre[])}
        />

        <Dropdown
          label="Platforms"
          data={allPlatforms}
          value={selectedPlatforms}
          multiple
          placeholder="Select platforms"
          onChange={val => setSelectedPlatforms(val as Platform[])}
        />

        <Dropdown
          label="Tags"
          data={allTags}
          value={selectedTags}
          multiple
          placeholder="Select tags"
          onChange={val => setSelectedTags(val as Tag[])}
        />

        <Dropdown
          label="Items per number"
          data={[
            { name: '2' }, 
            { name: '5' }, 
            { name: '10' }, 
            { name: '20' } 
            
          ]}
          value={itemsPerPage}
          placeholder="Select items"
          onChange={val => setItemsPerPage(val as { name: string })}
        />
      </div>

      <div className="mt-4">
        <button
          onClick={handleFilterSearch}
          className="w-full px-8 py-3 rounded bg-amber-500 text-black hover:bg-amber-400 font-medium transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Selected Filters Display */}
      {(selectedGenres.length > 0 || selectedPlatforms.length > 0 || selectedTags.length > 0) && (
        <div className="mt-4 space-y-2">
          {selectedGenres.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-400">Genres:</span>
              {selectedGenres.map(genre => (
                <span
                  key={genre.slug}
                  className="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 flex items-center gap-2"
                >
                  {genre.name}
                  <button
                    onClick={() => setSelectedGenres(prev => prev.filter(g => g.slug !== genre.slug))}
                    className="hover:text-amber-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {selectedPlatforms.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-400">Platforms:</span>
              {selectedPlatforms.map(platform => (
                <span
                  key={platform.slug}
                  className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 flex items-center gap-2"
                >
                  {platform.name}
                  <button
                    onClick={() => setSelectedPlatforms(prev => prev.filter(p => p.slug !== platform.slug))}
                    className="hover:text-blue-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-400">Tags:</span>
              {selectedTags.map(tag => (
                <span
                  key={tag.slug}
                  className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 flex items-center gap-2"
                >
                  {tag.name}
                  <button
                    onClick={() => setSelectedTags(prev => prev.filter(t => t.slug !== tag.slug))}
                    className="hover:text-green-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}