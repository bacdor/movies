export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  poster: string;
  description: string;
  rating: number;
  director: string;
  cast: string[];
  runtime: number;
  releaseDate: string;
}

export interface SearchFilters {
  query: string;
  genre: string;
  year: string;
  sortBy: "title" | "year" | "rating";
  sortOrder: "asc" | "desc";
}

export interface FavoriteMovie {
  id: number;
  addedAt: string;
}
