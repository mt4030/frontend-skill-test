import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel"
import GameCard from "./gamesCard"
import { Game } from '@/lib/type'
interface gameCarouselProps {
  gamesList: Game[]
}

export default function GameCarousel({gamesList}: gameCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className=" mb-10 px-2 md:px-20 lg:px-50  rounded-2xl  "
    >
    <CarouselContent className="-ml-4">
    {gamesList.map((game) => (
      <CarouselItem
        key={game.id}
        className="
          pl-4
          basis-1/2
          sm:basis-1/3
          md:basis-1/4
          lg:basis-1/5
          xl:basis-1/6
        "
      >
        <GameCard game={game} />
      </CarouselItem>
    ))}
  </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}