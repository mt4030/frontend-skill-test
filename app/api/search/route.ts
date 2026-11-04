import { NextRequest, NextResponse } from 'next/server';
import { autocompleteTitles } from '@/utils/watchmode/api';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? '';

  if (query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await autocompleteTitles(query, 2);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Watchmode search error:', error);

    return NextResponse.json(
      { error: 'Failed to search titles' },
      { status: 500 }
    );
  }
}