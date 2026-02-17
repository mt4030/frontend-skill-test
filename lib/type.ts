// ================= RAWG API TYPES =================
import { ReactNode } from "react"

export interface Genre {
  id: number
  slug: string
  name: string
}

export interface PlatformInfo {
  platform: {
    id: number
    slug: string
    name: string
  }
  released_at: string
  requirements?: {
    minimum?: string
    recommended?: string
  }
}

export interface Platform {
  id: number
  slug: string
  name: string
}

export interface Tag {
  id: number
  slug: string
  name: string
}

export interface ESRBRating {
  id: number
  slug: string
  name: string
}

export interface Game {
  id: number
  slug: string
  name: string
  released: string
  tba: boolean
  background_image: string
  rating: number
  rating_top: number
  ratings: any
  ratings_count: number
  reviews_text_count: string
  added: number
  added_by_status: any
  metacritic: number
  playtime: number
  suggestions_count: number
  updated: string

  genres?: Genre[]
  platforms?: PlatformInfo[]
  tags?: Tag[]
  esrb_rating?: ESRBRating
}

// ================= CONTEXT =================
export interface GameContextType {
  games: Game[]
  isLoading: boolean
  error: string | null

  favorite: number[]
  bookmark: number[]
 setGames: React.Dispatch<React.SetStateAction<Game[]>>;
  handleBookmark: (gameId: number) => void
  handleFavorite: (gameId: number) => void
}

// ================= PROPS =================
export interface GamesListProps {
  gamesList: Game[]
}
export interface GameProviderProps {
  children: ReactNode
}

export interface Filters {
  searchTerm: string
  selectedGenres: Genre[]
  selectedPlatforms: Platform[]
  selectedTags: Tag[]
  itemsPerPage: number
}

export interface GameCardProps {
  game: Game
  isFavorite?: boolean
  isBookmarked?: boolean
  onFavorite?: () => void
  onBookmark?: () => void
}


export interface GameCardProps {
  game: Game;
   isFavorite?: boolean;      
  isBookmarked?: boolean;    
  onFavorite?: () => void;    
  onBookmark?: () => void;  
}

export interface GameListProps {
  gamesList: Game[]
}

export interface GenreMapItem {
  id: number
  name: string
  games: Game[]
}
export interface SelectedFiltersProps {
  selectedGenres: Genre[];
  selectedPlatforms: Platform[];
  selectedTags: Tag[];
  onRemoveGenre: (slug: string) => void;
  onRemovePlatform: (slug: string) => void;
  onRemoveTag: (slug: string) => void;
}
export interface AdvancedGameFilterProps {
  initialGenres?: string[];        
  initialPlatforms?: string[];     
  initialTags?: string[];          
  initialSearch?: string;          
  onChange: (filters: Filters) => void; 
}