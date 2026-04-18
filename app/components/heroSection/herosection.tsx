import HeroCarousel from './heroCarousel'
import { Game } from '@/lib/type'
import HeroCallToAdvSearch from './heroCallToAdvSearch'

interface HeroSectionProps {
  gamesList: Game[]
}

const HeroSection: React.FC<HeroSectionProps> = ({ gamesList }) => {


  return (
    <section className='lg:min-h-screen lg:flex lg:flex-col lg:gap-5 '>
      <HeroCarousel gamesList={gamesList} />
      <HeroCallToAdvSearch/>
    </section>
  )
}

export default HeroSection
