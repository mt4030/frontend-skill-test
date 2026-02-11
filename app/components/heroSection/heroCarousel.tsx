'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/app/components/ui/carousel'
import Link from 'next/link'
import { Play } from "lucide-react";



interface HeroCarouselProps {
  gamesList: any[]
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ gamesList  }) => {
  return (
    <Carousel autoplay autoplayDelay={9000} >
      <CarouselContent className="h-full">
        {gamesList .map(game => (
          <CarouselItem key={game.id} className="relative w-full h-full">
        <div className="w-full h-[60vh] overflow-hidden relative">
  <img
    src={game.background_image}
    alt={game.name}
    className="w-full h-full object-cover max-w-full "
  />
 <div className="absolute inset-0 bg-linear-to-r from-black/90 to-black/20"></div>

</div>
<Link href={`/products/${game.id}`} className="absolute md:bottom-1/4 md:left-50 bottom-1/5 left-20 ">
  <div className="flex items-center gap-10">
  <img
      src={game.background_image}
      alt={game.name}
      className="w-25 h-25 rounded-full object-cover" // Small thumbnail style
    />
   
    <span className="text-white text-xl font-bold hover:text-yellow-500">
      {game.name}
    </span>
  </div>
</Link>

          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default HeroCarousel

