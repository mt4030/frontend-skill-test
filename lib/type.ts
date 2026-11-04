export type WatchmodeTitleType =
  | 'movie'
  | 'tv_series'
  | 'tv_special'
  | 'tv_miniseries'
  | 'short_film'
  | 'tv_movie';

export interface MovieCardItem {
  id: number;
  title: string;
  year: number;
  type: WatchmodeTitleType;
  poster?: string | null;
  backdrop?: string | null;
  user_rating?: number | null;
}

export interface MovieListItem extends MovieCardItem {
  imdb_id?: string | null;
  tmdb_id?: number | null;
  tmdb_type?: 'movie' | 'tv' | null;
}

export interface Movie extends MovieListItem {
  original_title?: string | null;
  plot_overview?: string | null;
  will_you_like_this?: string | null;
  review_summary?: string | null;

  runtime_minutes?: number | null;
  end_year?: number | null;
  release_date?: string | null;

  genres?: number[] | null;
  genre_names?: string[] | null;

  critic_score?: number | null;
  us_rating?: string | null;
  content_ratings?: Record<string, unknown> | null;

  posterMedium?: string | null;
  posterLarge?: string | null;
  original_language?: string | null;

  similar_titles?: number[] | null;
  networks?: number[] | null;
  network_names?: string[] | null;

  relevance_percentile?: number | null;
  popularity_percentile?: number | null;

  trailer?: string | null;
  trailer_thumbnail?: string | null;
}

export interface WatchmodeListResponse {
  titles: MovieListItem[];
  total_results?: number;
  page?: number;
}

export interface WatchmodeGenre {
  id: number;
  name: string;
}

export interface MovieGenre extends WatchmodeGenre {
  slug: string;
}

export interface WatchmodeAutocompleteItem {
  id: number;
  name: string;
  type?: WatchmodeTitleType | string | null;
  year?: number | null;
  image_url?: string | null;
}

export interface WatchmodeAutocompleteResponse {
  results: WatchmodeAutocompleteItem[];
}

export interface MovieSearchResult {
  id: number;
  title: string;
  year?: number | null;
  type?: string | null;
  image_url?: string | null;
}

export interface MovieListParams {
  limit?: number;
  page?: number;
  types?: string;
  sort_by?: string;
  genres?: string;
}

export interface MovieCardProps {
  movie: MovieCardItem;
  isFavorite?: boolean;
  isBookmarked?: boolean;
  onFavorite?: () => void;
  onBookmark?: () => void;
}

export interface MovieListProps {
  moviesList: Movie[];
}

export interface GenreMapItem {
  id: number;
  name: string;
  slug: string;
  movies: Movie[];
}

export interface MovieProviderProps {
  children: React.ReactNode;
}