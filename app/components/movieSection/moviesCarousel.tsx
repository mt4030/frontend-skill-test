import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/ui/carousel';

import MovieCard from './moviesCard';
import type { Movie } from '@/lib/type';

interface MovieCarouselProps {
  moviesList: Movie[];
}

export default function MovieCarousel({
  moviesList,
}: MovieCarouselProps) {
  return (
    <Carousel
      opts={{ align: 'start' }}
      className="mb-10 rounded-2xl bg-gray-900 px-2 py-5 md:px-20"
    >
      <CarouselContent className="-ml-4">
        {moviesList.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          >
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}