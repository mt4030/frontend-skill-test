
import { Game, Genre, Platform, Tag } from '@/lib/type';

export const getUniqueGenres = (games: Game[]): Genre[] =>
  Array.from(
    new Map(
      games.flatMap(game => game.genres || [])
           .map(g => [g.slug, { id: g.id, slug: g.slug, name: g.name }])
    ).values()
  );

export const getUniquePlatforms = (games: Game[]): Platform[] =>
  Array.from(
    new Map(
      games.flatMap(game => game.platforms || [])
           .map(p => [p.platform.slug, { id: p.platform.id, slug: p.platform.slug, name: p.platform.name }])
    ).values()
  );

export const getUniqueTags = (games: Game[]): Tag[] =>
  Array.from(
    new Map(
      games.flatMap(game => game.tags || [])
           .map(t => [t.slug, { id: t.id, slug: t.slug, name: t.name }])
    ).values()
  );

export const filterLiveSearch = (games: Game[], searchTerm: string, limit = 5) =>
  games
    .filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, limit);
