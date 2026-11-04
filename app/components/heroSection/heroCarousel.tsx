'use client';

import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/app/components/ui/carousel';

import type { Movie } from '@/lib/type';

interface HeroCarouselProps {
  moviesList: Movie[];
}

export default function HeroCarousel({
  moviesList,
}: HeroCarouselProps) {
  return (
    <Carousel autoplay autoplayDelay={9000}>
      <CarouselContent className="h-full">
        {moviesList.map((movie) => {
          const image = movie.backdrop || movie.poster;

          return (
            <CarouselItem
              key={movie.id}
              className="relative h-full w-full"
            >
              <div className="relative h-[60vh] w-full overflow-hidden bg-gray-950">
                {image && (
                  <img
                    src={image}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-linear-to-r from-black/90 to-black/20" />
              </div>

              <Link
                href={`/products/${movie.id}`}
                className="absolute bottom-1/5 left-6 md:bottom-1/4 md:left-20"
              >
                <div className="flex items-center gap-5 md:gap-10">
                  {movie.poster && (
                    <img
                      src={movie.poster}
                      alt=""
                      className="h-20 w-20 rounded-full object-cover md:h-25 md:w-25"
                    />
                  )}

                  <div>
                    <h2 className="text-xl font-bold text-white hover:text-amber-400 md:text-3xl">
                      {movie.title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-300">
                      {movie.year} · {movie.type === 'movie' ? 'Movie' : 'TV'}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}