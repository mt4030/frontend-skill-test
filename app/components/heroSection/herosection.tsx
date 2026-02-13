import HeroCarousel from './heroCarousel'
import { Game } from '@/lib/type'
import Link from 'next/link'

interface HeroSectionProps {
  gamesList: Game[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ gamesList }) => {


  return (
    <>
      <HeroCarousel gamesList={gamesList} />
      <div className="max-w-7xl mb-5 mx-auto mt-5 p-6 bg-gray-900 rounded-3xl text-center flex flex-col items-center justify-center gap-6 ">
      <p className="text-3xl md:text-4xl font-bold text-white"> 
        Looking for somethings <span className='text-red-700'>specific</span>?
      </p>
      <p className="text-gray-400 text-lg max-w-xl">
        Use our Advanced Search to filter games by genre, platform, tags, or search terms. Find exactly what you want in seconds!
      </p>
      <Link href={'/products/results'}>
      <button  className="px-8 py-4 bg-amber-500 text-amber-50 font-bold rounded-2xl hover:bg-amber-400 transition-all shadow-md hover:shadow-xl">
        Go to Advanced Search
      </button>
      </Link>
      
    </div>
    </>
  )
}

export default HeroSection
