import { NextRequest, NextResponse } from "next/server";
import { MovieService } from "@/lib/server/movieService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: "Invalid limit parameter" },
        { status: 400 }
      );
    }

    const movies = await MovieService.getPopularMovies(limit);
    return NextResponse.json({
      movies,
      total: movies.length,
      limit,
    });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}
