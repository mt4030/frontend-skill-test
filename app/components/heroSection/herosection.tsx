
import { mockGames } from '@/app/data/mockgames';
import { fetchGames } from '@/lib/api-calls';
import HeroCarousel from './heroCarousel';
import AdvancedGameFilter from '../gameSection/advanceSearch';
const HeroSection=async()=>{

//const games = await fetchGames(5)

   return(
<div className="">
 <HeroCarousel gamesList={mockGames}/>
<h2 className='text-3xl text-amber-50 text-center mt-10'>advance search</h2>
   <AdvancedGameFilter/> 


</div>

   ) 
}
export default HeroSection