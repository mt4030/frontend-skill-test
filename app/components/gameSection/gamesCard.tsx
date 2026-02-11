
import { Card, CardContent } from "@/components/ui/card"
interface GameCardProps {
  game: any;
}
import Link from "next/link";
const GameCard=({ game }: GameCardProps)=>{
return(

<Card className="relative w-full rounded group overflow-hidden">
  <Link href={`/products/${game.id}`}>
    <CardContent className="p-0 relative bg-gray-900">
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-60 md:h-80 object-cover"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 transition duration-300" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-2">
        <h3 className="text-sm md:text-base font-semibold text-amber-50">
          {game.name}{game.rating}
        </h3>
        <p className="text-xs md:text-sm text-amber-50">
          {game.released}
        </p>
      </div>
    </CardContent>
  </Link>
</Card>


)
}
export default GameCard