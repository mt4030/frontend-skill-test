"use client"

import { useForm } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { usePathname, useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { searchingLive } from "@/lib/api-calls"
import { Card, CardContent} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, } from "@/components/ui/field"
import { useGames } from "@/providers/context"
import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
export function GameSearch() {
  const form = useForm({ defaultValues: { title: "" } })
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch] = useDebounce(searchTerm, 400)
  const [showSuggestions, setShowSuggestions] = useState(false)
const{setGames}=useGames()
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  // React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchingLive(debouncedSearch),
    enabled: debouncedSearch.length >= 3,
  })

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Clear search when route changes
  useEffect(() => {
    setSearchTerm("")
    setShowSuggestions(false)
  }, [pathname])

  // Clicking a suggestion


const handleSuggestionClick = (game: any) => {
  setGames(prev => {
    if (prev.some(g => g.id === game.id)) return prev;
    return [...prev, game];
  });

  router.push(`/products/${game.id}`);
   setSearchTerm("")
    setShowSuggestions(false)
};


  return (
    <Card className="md:mx-5 w-full md:w-150 lg:w-200 bg-gray-900 border border-gray-800 shadow-lg  ">
    
      <CardContent className="space-y-4 relative ">
      <Search className="w-7 h-7 text-white cursor-pointer absolute top-1.5 right-1.5"/>
        <form.Field
          name="title"
          children={(field) => (
            <Field>
        
     
                <Input
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                    setSearchTerm(e.target.value)
                    setShowSuggestions(true)
                  }}
                  placeholder="Type at least 3 letters..."
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2  "
                />
               {isLoading && (
  <Loader2 className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 animate-spin" />
)}
          
            </Field>
            
          )}
        />

        {/* Suggestions */}
        {showSuggestions && debouncedSearch.length >= 3 && data?.results?.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded mt-1 z-50 max-h-60 overflow-y-auto shadow-lg"
          >
            {data.results.map((game: any) => (
              <div
                key={game.id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 transition"
                onClick={() => handleSuggestionClick(game)}
              >
            
                {game.background_image && (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <span className="text-sm font-medium text-white">{game.name}</span>
                  <p className="text-xs text-gray-400">
                    Released: {game.released || "Unknown"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-400 text-sm">Something went wrong.</p>}
      </CardContent>
    </Card>
  )
}
