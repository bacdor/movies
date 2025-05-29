import { Movie, SearchFilters } from "@/types/movie";

interface ApiResponse<T> {
  movies: T[];
  total: number;
  filters?: {
    query: string;
    genre: string;
    year: string;
    sortBy: string;
    sortOrder: string;
  };
  limit?: number;
}

class MovieAPI {
  private static async fetchAPI<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    const response = await fetch(`/api/movies${endpoint}${queryString}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all movies from the database
   */
  static async getAllMovies(): Promise<ApiResponse<Movie>> {
    return this.fetchAPI<Movie>("");
  }

  /**
   * Get a specific movie by ID
   */
  static async getMovieById(id: number): Promise<Movie> {
    const response = await fetch(`/api/movies/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Search movies with filters
   */
  static async searchMovies(
    filters: Partial<SearchFilters> = {}
  ): Promise<ApiResponse<Movie>> {
    return this.fetchAPI<Movie>("/search", filters as Record<string, string>);
  }

  /**
   * Get popular movies (highest rated)
   */
  static async getPopularMovies(
    limit: number = 10
  ): Promise<ApiResponse<Movie>> {
    return this.fetchAPI<Movie>("/popular", { limit: limit.toString() });
  }

  /**
   * Get movies by genre
   */
  static async getMoviesByGenre(genre: string): Promise<ApiResponse<Movie>> {
    return this.fetchAPI<Movie>("/search", { genre });
  }

  /**
   * Get movies by year
   */
  static async getMoviesByYear(year: number): Promise<ApiResponse<Movie>> {
    return this.fetchAPI<Movie>("/search", { year: year.toString() });
  }

  /**
   * Get all available genres
   */
  static async getGenres(): Promise<string[]> {
    const response = await fetch("/api/genres");
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  }
}

export { MovieAPI };
