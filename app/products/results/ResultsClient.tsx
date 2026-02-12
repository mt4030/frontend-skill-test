'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Genre, Platform, Tag } from '@/lib/type'
import { useGames } from '@/providers/context'
import AdvancedGameFilter from '@/app/components/advSearch/advanceSearch'

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
  const router = useRouter()

  const initialSearch = searchParams.q ?? ''
  const initialGenreSlugs = searchParams.genres?.split(',').filter(Boolean) ?? []
  const initialPlatformSlugs = searchParams.platforms?.split(',').filter(Boolean) ?? []
  const initialTagSlugs = searchParams.tags?.split(',').filter(Boolean) ?? []
  const initialItems = Number(searchParams.items ?? '20')

  const [filters, setFilters] = useState({
    searchTerm: initialSearch,
    selectedGenres: [] as Genre[],
    selectedPlatforms: [] as Platform[],
    selectedTags: [] as Tag[],
    itemsPerPage: initialItems
  })

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.searchTerm) params.set('q', filters.searchTerm)
    if (filters.selectedGenres.length)
      params.set('genres', filters.selectedGenres.map(g => g.slug).join(','))
    if (filters.selectedPlatforms.length)
      params.set('platforms', filters.selectedPlatforms.map(p => p.slug).join(','))
    if (filters.selectedTags.length)
      params.set('tags', filters.selectedTags.map(t => t.slug).join(','))
    params.set('items', String(filters.itemsPerPage))

    router.replace(`/products/results?${params.toString()}`, { scroll: false })
  }, [filters, router])

  const filteredGames = useMemo(() => {
    let result = [...games]

    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.toLowerCase()
      result = result.filter(g => g.name.toLowerCase().includes(term))
    }

    if (filters.selectedGenres.length > 0) {
      result = result.filter(game =>
        filters.selectedGenres.every(selected =>
          game.genres?.some(g => g.slug === selected.slug)
        )
      )
    }

    if (filters.selectedPlatforms.length > 0) {
      result = result.filter(game =>
        filters.selectedPlatforms.some(selected =>
          game.platforms?.some(p => p.platform.slug === selected.slug)
        )
      )
    }

    if (filters.selectedTags.length > 0) {
      result = result.filter(game =>
        filters.selectedTags.some(selected =>
          game.tags?.some(t => t.slug === selected.slug)
        )
      )
    }

    return result.slice(0, filters.itemsPerPage)
  }, [filters, games])

  const handleFiltersChange = (newValues: {
    searchTerm: string
    selectedGenres: Genre[]
    selectedPlatforms: Platform[]
    selectedTags: Tag[]
    itemsPerPage: number
  }) => setFilters(newValues)

  return (
    <div className="max-w-7xl mx-auto p-4">
      <AdvancedGameFilter
        initialSearch={initialSearch}
        initialGenres={initialGenreSlugs}
        initialPlatforms={initialPlatformSlugs}
        initialTags={initialTagSlugs}
        onChange={handleFiltersChange}
      />

      <div className="mt-8">
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  )
}
