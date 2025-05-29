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
  private static getBaseUrl() {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      return ""; // Empty string for relative URLs in browser
    }
    // For server-side, use absolute URL
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }

  private static async fetchAPI<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const baseUrl = this.getBaseUrl();
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    const url = `${baseUrl}/api/movies${endpoint}${queryString}`;

    const response = await fetch(url);

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
    const baseUrl = this.getBaseUrl();
    const response = await fetch(`${baseUrl}/api/movies/${id}`);
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
    // If there's a search query, use the search endpoint
    if (filters.query) {
      return this.fetchAPI<Movie>("/search", { q: filters.query });
    }

    // For filtering without search, use the main movies endpoint
    const params: Record<string, string> = {};
    if (filters.genre && filters.genre !== "all") params.genre = filters.genre;
    if (filters.year && filters.year !== "all") params.year = filters.year;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    return this.fetchAPI<Movie>("", params);
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
    return this.fetchAPI<Movie>("", { genre });
  }

  /**
   * Get movies by year
   */
  static async getMoviesByYear(year: number): Promise<ApiResponse<Movie>> {
    return this.fetchAPI<Movie>("", { year: year.toString() });
  }

  /**
   * Get all available genres
   */
  static async getGenres(): Promise<string[]> {
    const baseUrl = this.getBaseUrl();
    const response = await fetch(`${baseUrl}/api/genres`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  }
}

export { MovieAPI };
