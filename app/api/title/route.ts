import { NextRequest, NextResponse } from 'next/server';
import { getTitles } from '@/utils/watchmode/api';
import type { WatchmodeTitleType } from '@/lib/type';

const allowedTypes: WatchmodeTitleType[] = [
  'movie',
  'tv_series',
  'tv_special',
  'tv_miniseries',
  'short_film',
  'tv_movie',
];

const allowedSorts = [
  'relevance_desc',
  'relevance_asc',
  'popularity_desc',
  'popularity_asc',
  'release_date_desc',
  'release_date_asc',
  'title_desc',
  'title_asc',
];

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const requestedLimit = Number(params.get('limit') ?? 40);
    const requestedPage = Number(params.get('page') ?? 1);

    const limit = Number.isFinite(requestedLimit)
      ? Math.min(250, Math.max(1, requestedLimit))
      : 40;

    const page = Number.isFinite(requestedPage)
      ? Math.max(1, requestedPage)
      : 1;

    const requestedTypes = (
      params.get('types') ?? 'movie,tv_series'
    )
      .split(',')
      .filter((type): type is WatchmodeTitleType =>
        allowedTypes.includes(type as WatchmodeTitleType)
      );

    const requestedSort = params.get('sort_by') ?? 'popularity_desc';

    const sortBy = allowedSorts.includes(requestedSort)
      ? requestedSort
      : 'popularity_desc';

    const data = await getTitles({
      limit,
      page,
      types: requestedTypes.join(',') || 'movie,tv_series',
      sort_by: sortBy,
      genres: params.get('genres') ?? undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Watchmode titles error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch titles' },
      { status: 500 }
    );
  }
}