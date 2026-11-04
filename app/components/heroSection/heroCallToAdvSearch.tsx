import Link from 'next/link';

export default function HeroCallToAdvSearch() {
  return (
    <div className="mx-auto mb-5 mt-5 hidden max-w-7xl flex-col items-center justify-center gap-6 rounded-3xl bg-amber-50 p-6 text-center lg:flex">

      <p className="mb-5 text-3xl font-bold text-gray-800 md:text-4xl">
        Looking for something{' '}
        <span className="text-red-700">
          specific
        </span>
        ?
      </p>

      <p className="mb-5 max-w-xl text-lg text-gray-400">
        Use our Advanced Search to filter movies and TV shows.
        Find exactly what you want in seconds!
      </p>

      <Link
        href="/products/results"
        className="rounded-2xl bg-amber-500 px-8 py-4 font-bold text-amber-50 shadow-md transition-all hover:bg-amber-400 hover:shadow-xl"
      >
        Go to Advanced Search
      </Link>

    </div>
  );
}