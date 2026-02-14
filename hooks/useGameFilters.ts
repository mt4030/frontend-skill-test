'use client'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Genre, Platform, Tag, Game } from '@/lib/type'

// Define the filter state structure
interface Filters {
  searchTerm: string
  selectedGenres: Genre[]
  selectedPlatforms: Platform[]
  selectedTags: Tag[]
  itemsPerPage: number
}

// Custom hook for filtering games + syncing URL
export function useGameFilters(
  games: Game[],                     // Full games list
  initialValues: Partial<Filters> = {}  // Optional initial values
) {
  const router = useRouter()

  // State for all filters
  const [filters, setFilters] = useState<Filters>({
    searchTerm: initialValues.searchTerm || '',
    selectedGenres: initialValues.selectedGenres || [],
    selectedPlatforms: initialValues.selectedPlatforms || [],
    selectedTags: initialValues.selectedTags || [],
    itemsPerPage: initialValues.itemsPerPage || 20,
  })

  // Whenever filters change, update the URL query params (hydration safe)
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

  // Memoized filtering logic
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

    // Limit the number of results
    return result.slice(0, filters.itemsPerPage)
  }, [filters, games])

  return { filters, setFilters, filteredGames }
}
