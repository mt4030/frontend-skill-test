import { NextRequest, NextResponse } from 'next/server';
import { getTitleDetails } from '@/utils/watchmode/api';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { error: 'Invalid title ID' },
        { status: 400 }
      );
    }

    const movie = await getTitleDetails(id);

    return NextResponse.json(movie);
  } catch (error) {
    console.error('Watchmode details error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch title details' },
      { status: 500 }
    );
  }
}