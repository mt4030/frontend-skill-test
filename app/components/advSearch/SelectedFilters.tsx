import { SelectedFiltersProps } from '@/lib/type';

export const SelectedFilters = ({
  selectedGenres,
  selectedPlatforms,
  selectedTags,
  onRemoveGenre,
  onRemovePlatform,
  onRemoveTag
}: SelectedFiltersProps) => (
  <div className="mt-4 space-y-2">
    {selectedGenres.length > 0 && (
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-400">Genres:</span>
        {selectedGenres.map(g => (
          <span key={g.slug} className="px-3 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 flex items-center gap-2">
            {g.name} <button onClick={() => onRemoveGenre(g.slug)} className="hover:text-amber-300">×</button>
          </span>
        ))}
      </div>
    )}
    {selectedPlatforms.length > 0 && (
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-400">Platforms:</span>
        {selectedPlatforms.map(p => (
          <span key={p.slug} className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 flex items-center gap-2">
            {p.name} <button onClick={() => onRemovePlatform(p.slug)} className="hover:text-blue-300">×</button>
          </span>
        ))}
      </div>
    )}
    {selectedTags.length > 0 && (
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-400">Tags:</span>
        {selectedTags.map(t => (
          <span key={t.slug} className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 flex items-center gap-2">
            {t.name} <button onClick={() => onRemoveTag(t.slug)} className="hover:text-green-300">×</button>
          </span>
        ))}
      </div>
    )}
  </div>
);
