import { NextRequest, NextResponse } from "next/server";
import { MovieService } from "@/lib/server/movieService";

export async function GET() {
  try {
    const genres = await MovieService.getGenres();
    return NextResponse.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}
