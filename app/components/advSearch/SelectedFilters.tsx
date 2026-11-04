import type { MovieGenre } from '@/lib/type';

interface SelectedFiltersProps {
  selectedGenres: MovieGenre[];
  selectedType: 'all' | 'movie' | 'tv_series';
  onRemoveGenre: (slug: string) => void;
  onRemoveType: () => void;
}

export function SelectedFilters({
  selectedGenres,
  selectedType,
  onRemoveGenre,
  onRemoveType,
}: SelectedFiltersProps) {
  return (
    <div className="mt-4 space-y-3">

      {/* select genres */}
      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">

          <span className="text-sm text-gray-400">
            Genres:
          </span>

          {selectedGenres.map((genre) => (
            <span
              key={genre.id}
              className="flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-400"
            >
              {genre.name}

              <button
                type="button"
                onClick={() => onRemoveGenre(genre.slug)}
                aria-label={`Remove ${genre.name} genre`}
                className="hover:text-amber-200"
              >
                ×
              </button>
            </span>
          ))}

        </div>
      )}

      {/* selected ype */}
      {selectedType !== 'all' && (
        <div className="flex flex-wrap items-center gap-2">

          <span className="text-sm text-gray-400">
            Type:
          </span>

          <span className="flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">

            {selectedType === 'movie' ? 'Movies' : 'TV Shows'}

            <button
              type="button"
              onClick={onRemoveType}
              aria-label="Remove type filter"
              className="hover:text-blue-200"
            >
              ×
            </button>

          </span>

        </div>
      )}

    </div>
  );
}