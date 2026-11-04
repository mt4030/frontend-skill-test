import { NextResponse } from 'next/server';
import { getHomeMovies } from '@/utils/watchmode/api';

export async function GET() {
  try {
    const movies = await getHomeMovies();
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Homepage movies error:', error);

    return NextResponse.json(
      { error: 'Failed to load homepage titles' },
      { status: 500 }
    );
  }
}