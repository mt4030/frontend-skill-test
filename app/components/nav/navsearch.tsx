// SearchBar.tsx

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useGames } from '@/providers/context'

interface SearchBarProps {
  placeholder: string
  onSearch: (searchTerm: string) => void
}

const NavSearch: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const { games } = useGames() // Fetch games from context
  const [searchTerm, setSearchTerm] = useState('')
  const [liveSearchResults, setLiveSearchResults] = useState<typeof games>([])

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value) // Trigger onSearch from parent component
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm) // Trigger search on Enter key press
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
      {liveSearchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded mt-1 z-50 max-h-60 overflow-y-auto">
          {liveSearchResults.map(game => (
            <Link
              key={game.id}
              href={`/products/${game.id}`}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 transition"
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
  )
}

export default NavSearch
