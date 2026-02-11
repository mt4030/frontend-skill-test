'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useGames } from '@/providers/context'
import { Search } from "lucide-react"
import { useRouter } from 'next/navigation'
const NavSearch = () => {
  const { games } = useGames()
  const [searchTerm, setSearchTerm] = useState('')
  const [liveSearchResults, setLiveSearchResults] = useState<typeof games>([])
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const suggestionsRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  // Live search functionality
  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setLiveSearchResults([])
      return
    }

    const results = games.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setLiveSearchResults(results.slice(0, 5)) // Limit results to top 5
  }, [searchTerm, games]) // Re-run when searchTerm or games change

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current && !searchInputRef.current.contains(e.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)
      ) {
        setLiveSearchResults([]) // Close suggestions
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSuggestionClick = (gameId: number) => {
    setSearchTerm('') // Clear search input after selection
    router.push(`/products/${gameId}`) // Navigate to the selected game's page
    setLiveSearchResults([]) // Clear suggestions
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trigger search or handle enter key logic
    }
  }

  return (
    <div className="relative">
      <Search
        className="w-7 h-7 cursor-pointer absolute top-1.5 right-1.5"
      />
      <input
        ref={searchInputRef}
        type="text"
        className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        placeholder="Search games..."
      />
      {liveSearchResults.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded mt-1 z-50 max-h-60 overflow-y-auto"
        >
          {liveSearchResults.map(game => (
            <Link
              key={game.id}
              href={`/products/${game.id}`}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 transition"
              onClick={() => handleSuggestionClick(game.id)} // Call the handleSuggestionClick function
            >
              {game.background_image && (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-10 h-10 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <span className="text-sm font-medium">{game.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavSearch
