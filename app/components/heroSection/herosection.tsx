'use client'

import HeroCarousel from './heroCarousel'
import AdvancedGameFilter from '../advSearch/advanceSearch'
import { useRouter } from 'next/navigation'

interface HeroSectionProps {
  gamesList: any[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ gamesList }) => {
  const router = useRouter()

  const handleFiltersChange = (filters: any) => {
    // Navigate to results page when filters change
    const query = new URLSearchParams()
    if (filters.searchTerm) query.set('q', filters.searchTerm)
    if (filters.selectedGenres.length) query.set('genres', filters.selectedGenres.map((g: any) => g.slug).join(','))
    if (filters.selectedPlatforms?.length) query.set('platforms', filters.selectedPlatforms.map((p: any) => p.slug).join(','))
    if (filters.selectedTags?.length) query.set('tags', filters.selectedTags.map((t: any) => t.slug).join(','))
    query.set('items', String(filters.itemsPerPage))

    router.push(`/products/results?${query.toString()}`)
  }

  return (
    <>
      <HeroCarousel gamesList={gamesList} />
      <h2 className="text-white text-3xl font-bold mt-10 text-center">Advanced Search</h2>
      <AdvancedGameFilter
        initialGenres={[]}
        initialPlatforms={[]}
        initialTags={[]}
        initialSearch=""
        onChange={handleFiltersChange}
      />
    </>
  )
}

export default HeroSection