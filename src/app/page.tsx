"use client";

import { useState, useEffect } from "react";
import { MovieAPI } from "@/lib/api";
import { Movie, SearchFilters } from "@/types/movie";
import { MovieCard } from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar";
import { MovieModal } from "@/components/MovieModal";
import { FilterPanel } from "@/components/FilterPanel";

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

export default function MovieApp() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<string[]>([]);

  // Load initial movies, favorites, and genres on component mount
  useEffect(() => {
    loadInitialMovies();
    loadFavorites();
    loadGenres();
  }, []);

  // Load favorites from localStorage
  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  // Save favorites to localStorage
  const saveFavorites = (newFavorites: number[]) => {
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  // Load genres
  const loadGenres = async () => {
    try {
      const genresList = await MovieAPI.getGenres();
      setGenres(genresList);
    } catch (error) {
      console.error("Error loading genres:", error);
    }
  };

  // Load initial movies (popular ones)
  const loadInitialMovies = async () => {
    try {
      setLoading(true);
      const response = await MovieAPI.getPopularMovies(20);
      setMovies(response.movies);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search and filters together
  const handleSearchAndFilters = async (
    query: string,
    filters: Partial<SearchFilters> = {}
  ) => {
    try {
      setLoading(true);
      let response;

      if (query.trim()) {
        // If there's a search query, use the search endpoint
        response = await MovieAPI.searchMovies({ query });
      } else if (Object.keys(filters).length > 0) {
        // If there are filters but no search query, use the main endpoint
        response = await MovieAPI.searchMovies(filters);
      } else {
        // If no search or filters, load popular movies
        response = await MovieAPI.getPopularMovies(20);
      }

      setMovies(response.movies);
    } catch (error) {
      console.error("Error searching/filtering movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchAndFilters(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle filter changes
  const handleFilterChange = async (filters: Partial<SearchFilters>) => {
    handleSearchAndFilters(searchQuery, filters);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (movieId: number) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    saveFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🎬 Movie Search & Management
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="space-y-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <FilterPanel
            onFilterChange={handleFilterChange}
            genres={genres}
            disabled={!!searchQuery.trim()} // Disable filters when searching
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Loading movies...
            </p>
          </div>
        )}

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={setSelectedMovie}
              onFavoriteToggle={handleFavoriteToggle}
              isFavorite={favorites.includes(movie.id)}
            />
          ))}
          {movies.length === 0 && !loading && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No movies found. Try searching for something!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

/* 
TODO: Create these components in src/components/:

1. MovieCard.tsx - Individual movie card component
   - Props: movie, onMovieClick, onFavoriteToggle, isFavorite
   - Display: poster, title, year, rating, favorite button

2. MovieModal.tsx - Movie detail modal/popup
   - Props: movie, isOpen, onClose
   - Display: full movie details, cast, description, etc.

3. SearchBar.tsx - Enhanced search with filters
   - Props: onSearch, onFilterChange
   - Features: search input, genre filter, year filter

4. FilterPanel.tsx - Advanced filtering options
   - Props: onFilterChange, filters
   - Features: genre dropdown, year range, sort options

5. FavoritesList.tsx - Display favorite movies
   - Props: favoriteMovies, onMovieClick
   - Features: list of favorited movies

Example usage of MovieAPI:
- MovieAPI.searchMovies({ query: 'batman' })
- MovieAPI.getMovieById(1)
- MovieAPI.getPopularMovies()

Example usage of utils:
- formatRating(8.5) // "8.5"
- formatRuntime(142) // "2h 22m"
- addToFavorites(movieId)
- removeFromFavorites(movieId)
- isFavorite(movieId)
*/
