import { NextRequest, NextResponse } from "next/server";
import { MovieService } from "@/lib/server/movieService";
import { SearchFilters } from "@/types/movie";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract search parameters
    const query = searchParams.get("q") || "";

    // Perform search using MovieService
    const movies = await MovieService.searchMovies({ query });

    // Return results with metadata
    return NextResponse.json({
      movies,
      total: movies.length,
      filters: {
        query,
      },
    });
  } catch (error) {
    console.error("Error searching movies:", error);
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 }
    );
  }
}
