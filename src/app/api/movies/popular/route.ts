import { NextRequest, NextResponse } from 'next/server';
import { MovieAPI } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get limit parameter, default to 6
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 6;
    
    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Invalid limit parameter. Must be between 1 and 50.' },
        { status: 400 }
      );
    }
    
    // Get popular movies
    const movies = await MovieAPI.getPopularMovies(limit);
    
    return NextResponse.json({
      movies,
      total: movies.length,
      limit
    });
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular movies' },
      { status: 500 }
    );
  }
} 