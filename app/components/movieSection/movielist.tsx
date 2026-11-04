'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

import MovieCarousel from './moviesCarousel';
import type { Movie } from '@/lib/type';

interface MovieListProps {
  moviesList: Movie[];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function MovieList({ moviesList }: MovieListProps) {
  const genreMap = new Map<
    string,
    { id: number; name: string; movies: Movie[] }
  >();

  moviesList.forEach((movie) => {
    movie.genre_names?.forEach((genreName, index) => {
      const slug = slugify(genreName);

      const existing = genreMap.get(slug);

      if (existing) {
        if (!existing.movies.some((item) => item.id === movie.id)) {
          existing.movies.push(movie);
        }
      } else {
        genreMap.set(slug, {
          id: movie.genres?.[index] ?? index,
          name: genreName,
          movies: [movie],
        });
      }
    });
  });

  const categories = Array.from(genreMap.entries()).map(
    ([slug, category]) => ({
      slug,
      ...category,
    })
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="space-y-8 bg-gray-800 px-5 pb-20 pt-15 md:px-10">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.slug}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold capitalize text-amber-50 transition-colors hover:text-amber-300 md:text-3xl">
                {category.name}
              </h2>

              <Link
                href={`/products/category/${category.slug}`}
                className="border-2 p-1 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-50 md:text-base"
              >
                See More
              </Link>
            </div>

            <MovieCarousel moviesList={category.movies} />
          </div>
        ))
      ) : (
        <>
          <h2 className="text-2xl font-bold text-amber-50">
            Popular titles
          </h2>
          <MovieCarousel moviesList={moviesList} />
        </>
      )}

      <div className="flex justify-center pt-5">
        <Button
          onClick={scrollToTop}
          className="w-50 bg-amber-600 hover:bg-amber-500"
        >
          Back to top
        </Button>
      </div>
    </section>
  );
}