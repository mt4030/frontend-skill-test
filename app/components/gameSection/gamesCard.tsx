
import { Card, CardContent } from "@/components/ui/card"
import {GameCardProps} from '@/lib/type'
import Link from "next/link";


const GameCard=({ game }: GameCardProps)=>{
return(
<Card className="relative w-full rounded group overflow-hidden">
  <Link href={`/products/${game.id}`}>
    <CardContent className="p-0 relative bg-gray-900">
<div className=" text-amber-50 h-4 top-3 left-3 w-8 text-[12px] bg-amber-500 rounded-4xl flex justify-center items-center font-bold absolute">{game.rating}</div>
      <img
        src={game.background_image}
        alt={game.name}
        className="w-full h-60 md:h-80 object-cover"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 transition duration-300" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 h-[25%] w-full bg-black/70 text-white p-2">
        <h3 className="text-sm md:text-base font-semibold text-amber-50">
          {game.name}
        </h3>
      </div>
    </CardContent>
  </Link>
</Card>
)
}
export default GameCard