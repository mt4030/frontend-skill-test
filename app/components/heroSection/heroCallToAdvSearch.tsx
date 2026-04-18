import Link from "next/link"

const HeroCallToAdvSearch=()=>{

return(
    <div className=" hidden lg:block max-w-7xl mb-5 mx-auto mt-5 p-6   bg-amber-50 rounded-3xl text-center flex flex-col items-center justify-center gap-6 ">
      <p className="text-3xl mb-5 md:text-4xl font-bold text-gray-800"> 
        Looking for somethings <span className='text-red-700'>specific</span>?
      </p>
      <p className="text-gray-400 text-lg max-w-xl mb-5">
        Use our Advanced Search to filter games. Find exactly what you want in seconds!
      </p>
      <Link href={'/products/results'}>
      <button  className="px-8 py-4 bg-amber-500 text-amber-50 font-bold rounded-2xl hover:bg-amber-400 transition-all shadow-md hover:shadow-xl">
        Go to Advanced Search
      </button>
      </Link>
      
    </div>
)

}
export default HeroCallToAdvSearch