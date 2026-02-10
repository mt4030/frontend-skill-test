
import { mockGames } from '@/app/data/mockgames';
//import { fetchGames } from '@/lib/api-calls';
import GameCarousel from './gamesCarousel';
import Link from 'next/link';

///async


const GameList=()=>{

//const games = await fetchGames(30)
const actionGames = mockGames.filter(game =>
  game.genres.some(g => g.slug === "action")
);

const rpgGames = mockGames.filter(game =>
  game.genres.some(g => g.slug === "rpg")
);

const openWorldGames = mockGames.filter(game =>
  game.genres.some(g => g.slug === "open-world")
);
const gameCategory=[{name:'action Games',genres:actionGames},{name:'rpg Games',genres:rpgGames},{name:'open World Games',genres:openWorldGames}
]
   return(
   <>
  
    <div className="space-y-8 px-5 md:px-10 bg-gray-900 pt-10 pb-20">

{gameCategory.map((m)=>( <><div className="flex justify-between items-center ">
    <h2 className="text-2xl md:text-3xl text-amber-50 font-bold capitalize hover:text-amber-300 transition-colors duration-300  ">
      {m.name}
    </h2>
    <Link
      href="#"
      className="text-sm border-2 p-1 md:text-base text-amber-300 hover:text-amber-50 font-semibold transition-colors"
    >
      See More
    </Link>
  </div>
  <GameCarousel gamesList={m.genres} /></>))}
</div>
   </>
  





   ) 
}
export default GameList