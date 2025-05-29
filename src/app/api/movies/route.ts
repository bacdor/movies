import { NextRequest, NextResponse } from 'next/server';
import { MovieAPI } from '@/lib/api';
import { SearchFilters } from '@/types/movie';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
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
    
    // If no specific filters are applied, get all movies
    if (!query && genre === 'all' && year === 'all') {
      const movies = await MovieAPI.getAllMovies();
      return NextResponse.json(movies);
    }
    
    // Otherwise, search with filters
    const movies = await MovieAPI.searchMovies(filters);
    
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // For future extensibility - adding new movies
    return NextResponse.json(
      { error: 'POST method not implemented yet' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error creating movie:', error);
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 500 }
    );
  }
} 