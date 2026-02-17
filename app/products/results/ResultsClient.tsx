'use client'

import { useGames } from '@/providers/context'
import AdvancedGameFilter from '@/app/components/advSearch/advanceSearch'
import { useGameFilters } from '@/hooks/useGameFilters'
import { Genre, Platform, Tag } from '@/lib/type'

interface Props {
  searchParams: {
    q?: string
    genres?: string
    platforms?: string
    tags?: string
    items?: string
  }
}

export default function ResultsClient({ searchParams }: Props) {
  const { games } = useGames()

  if (!games || games.length === 0) return null

  const initialSearch = searchParams.q ?? ''

  // Map slugs from query params to full objects, fallback id: -1
  const initialGenres: Genre[] =
    searchParams.genres?.split(',').filter(Boolean).map(slug => {
      const genre = games.flatMap(g => g.genres ?? []).find(g => g.slug === slug)
      return genre ?? { id: -1, slug, name: slug }
    }) ?? []

  const initialPlatforms: Platform[] =
    searchParams.platforms?.split(',').filter(Boolean).map(slug => {
      const platform = games
        .flatMap(g => g.platforms ?? [])
        .map(p => p.platform)
        .find(p => p.slug === slug)
      return platform ?? { id: -1, slug, name: slug }
    }) ?? []

  const initialTags: Tag[] =
    searchParams.tags?.split(',').filter(Boolean).map(slug => {
      const tag = games.flatMap(g => g.tags ?? []).find(t => t.slug === slug)
      return tag ?? { id: -1, slug, name: slug }
    }) ?? []

  const initialItems = Number(searchParams.items ?? '20')

  // Use reusable hook
  const { filters, setFilters, filteredGames } = useGameFilters(games, {
    searchTerm: initialSearch,
    selectedGenres: initialGenres,
    selectedPlatforms: initialPlatforms,
    selectedTags: initialTags,
    itemsPerPage: initialItems,
  })

  const handleFiltersChange = (newValues: {
    searchTerm: string
    selectedGenres: Genre[]
    selectedPlatforms: Platform[]
    selectedTags: Tag[]
    itemsPerPage: number
  }) => setFilters(newValues)

  return (
    <div className="max-w-7xl mx-auto p-4  ">
      <AdvancedGameFilter
        initialSearch={initialSearch}
        initialGenres={filters.selectedGenres.map(g => g.slug)}
        initialPlatforms={filters.selectedPlatforms.map(p => p.slug)}
        initialTags={filters.selectedTags.map(t => t.slug)}
        onChange={handleFiltersChange}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {filteredGames.map(game => (
          <a
            key={game.id}
            href={`/products/${game.id}`}
            className="group bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-amber-900/30"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                ⭐ {game.rating}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                {game.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
