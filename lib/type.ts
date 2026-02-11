export interface PlatformInfo {
  platform: {
    id: number;
    slug: string;
    name: string;
  };
  released_at: string;
  requirements: {
    minimum: string;
    recommended: string;
  };
}

export interface ESRBRating {
  id: number;
  slug: string;
  name: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: any;
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: any;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating?: ESRBRating;
  platforms?: PlatformInfo[];
}
