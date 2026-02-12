'use client';
import { useRouter } from 'next/navigation';

const GameError = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-red-500 animate-pulse">
        ⚔️ Game Not Found ⚔️
      </h1>
      <p className="text-lg md:text-2xl mb-6 text-gray-300">
        Sorry, the adventure you’re looking for doesn’t exist.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
      >
        Go Home
      </button>
    </div>
  );
};

export default GameError;
