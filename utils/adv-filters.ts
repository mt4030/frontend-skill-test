import type { Movie, MovieGenre } from '@/lib/type';

function slugifyGenre(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getUniqueGenres(movies: Movie[]): MovieGenre[] {
  const genres = new Map<number, MovieGenre>();

  movies.forEach((movie) => {
    movie.genre_names?.forEach((name, index) => {
      const id = movie.genres?.[index];

      if (id === undefined || genres.has(id)) {
        return;
      }

      genres.set(id, {
        id,
        name,
        slug: slugifyGenre(name),
      });
    });
  });

  return Array.from(genres.values());
}

export function filterLiveSearch(
  movies: Movie[],
  searchTerm: string,
  limit = 5
): Movie[] {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return [];
  }

  return movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(term)
    )
    .slice(0, limit);
}