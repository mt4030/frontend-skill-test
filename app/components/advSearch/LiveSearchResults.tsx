import Link from 'next/link';
import { Game } from '@/lib/type';

interface LiveSearchProps {
  results: Game[];
}

export const LiveSearchResults = ({ results }: LiveSearchProps) => (
  <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded mt-1 z-50 max-h-60 overflow-y-auto">
    {results.map(game => (
      <Link key={game.id} href={`/products/${game.id}`} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 transition">
        <img src={game.background_image} alt={game.name} className="w-10 h-10 rounded object-cover" />
        <div className="flex-1">
          <span className="text-sm font-medium">{game.name}</span>
          {game.genres && game.genres.length > 0 && (
            <div className="text-xs text-gray-400 mt-0.5">
              {game.genres.slice(0, 2).map(g => g.name).join(', ')}
            </div>
          )}
        </div>
      </Link>
    ))}
  </div>
);
