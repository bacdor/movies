import { NextRequest, NextResponse } from "next/server";
import { MovieService } from "@/lib/server/movieService";
import { SearchFilters } from "@/types/movie";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract all parameters
    const query = searchParams.get("query") || searchParams.get("q") || "";
    const genre = searchParams.get("genre") || "all";
    const year = searchParams.get("year") || "all";
    const sortBy =
      (searchParams.get("sortBy") as "title" | "year" | "rating") || "rating";
    const sortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    // Build filters object, only including non-default values
    const filters: Partial<SearchFilters> = {
      ...(query && { query }),
      ...(genre !== "all" && { genre }),
      ...(year !== "all" && { year }),
      sortBy,
      sortOrder,
    };

    // Get all movies first
    let movies = await MovieService.getAllMovies();

    // Apply search query filter if present
    if (query) {
      const searchLower = query.toLowerCase();
      movies = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchLower) ||
          movie.director.toLowerCase().includes(searchLower) ||
          movie.cast.some((actor) => actor.toLowerCase().includes(searchLower))
      );
    }

    // Apply genre filter if present
    if (genre !== "all") {
      movies = movies.filter((movie) => movie.genre.includes(genre));
    }

    // Apply year filter if present
    if (year !== "all") {
      movies = movies.filter((movie) => movie.year.toString() === year);
    }

    // Apply sorting
    movies.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "year":
          comparison = a.year - b.year;
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    // Return results with metadata about the applied filters
    return NextResponse.json({
      movies,
      total: movies.length,
      filters: {
        query,
        genre,
        year,
        sortBy,
        sortOrder,
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
