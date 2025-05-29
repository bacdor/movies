import { NextRequest, NextResponse } from 'next/server';
import { MovieAPI } from '@/lib/api';
import { SearchFilters } from '@/types/movie';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract search parameters
    const query = searchParams.get('q') || '';
    const genre = searchParams.get('genre') || 'all';
    const year = searchParams.get('year') || 'all';
    const sortBy = searchParams.get('sortBy') as 'title' | 'year' | 'rating' || 'rating';
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc';
    
    // Build filters object
    const filters: Partial<SearchFilters> = {
      query,
      genre,
      year,
      sortBy,
      sortOrder
    };
    
    // Perform search
    const movies = await MovieAPI.searchMovies(filters);
    
    // Return results with metadata
    return NextResponse.json({
      movies,
      total: movies.length,
      filters: {
        query,
        genre,
        year,
        sortBy,
        sortOrder
      }
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    return NextResponse.json(
      { error: 'Failed to search movies' },
      { status: 500 }
    );
  }
} 