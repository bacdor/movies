import { NextRequest, NextResponse } from 'next/server';
import { MovieAPI } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const genres = await MovieAPI.getGenres();
    
    return NextResponse.json({
      genres,
      total: genres.length
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch genres' },
      { status: 500 }
    );
  }
} 