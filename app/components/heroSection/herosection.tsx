import HeroCarousel from './heroCarousel';
import HeroCallToAdvSearch from './heroCallToAdvSearch';

import type { Movie } from '@/lib/type';

interface HeroSectionProps {
  moviesList: Movie[];
}

export default function HeroSection({
  moviesList,
}: HeroSectionProps) {
  return (
    <section className="lg:flex lg:min-h-screen lg:flex-col lg:gap-5">
      <HeroCarousel moviesList={moviesList} />
      <HeroCallToAdvSearch />
    </section>
  );
}