"use client";

import { useState, useEffect } from "react";
import { MovieAPI } from "@/lib/api";
import { Movie, SearchFilters } from "@/types/movie";
import { MovieCard } from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar";
import { MovieModal } from "@/components/MovieModal";
import { FilterPanel } from "@/components/FilterPanel";
import { SortPanel } from "@/components/SortPanel";

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
  const [currentFilters, setCurrentFilters] = useState<
    Pick<SearchFilters, "genre" | "year">
  >({
    genre: "all",
    year: "all",
  });
  const [currentSort, setCurrentSort] = useState<
    Pick<SearchFilters, "sortBy" | "sortOrder">
  >({
    sortBy: "rating",
    sortOrder: "desc",
  });

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
      // Reset filters when loading initial movies
      setCurrentFilters({ genre: "all", year: "all" });
      setCurrentSort({ sortBy: "rating", sortOrder: "desc" });
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search with current filters and sort
  const handleSearch = async () => {
    try {
      setLoading(true);
      let response;

      // If there's a search query, only use that
      if (searchQuery.trim()) {
        response = await MovieAPI.searchMovies({ query: searchQuery.trim() });
      } else {
        // If no search query, use filters and sort
        const searchParams = {
          ...(currentFilters.genre !== "all" && {
            genre: currentFilters.genre,
          }),
          ...(currentFilters.year !== "all" && { year: currentFilters.year }),
          ...currentSort,
        };

        // If we have any filter parameters, use the search endpoint
        if (Object.keys(searchParams).length > 0) {
          response = await MovieAPI.searchMovies(searchParams);
        } else {
          // If no filters, load popular movies
          response = await MovieAPI.getPopularMovies(20);
        }
      }

      setMovies(response.movies);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (
    filters: Pick<SearchFilters, "genre" | "year">
  ) => {
    setCurrentFilters(filters);
  };

  // Handle sort changes
  const handleSortChange = (
    sortOptions: Pick<SearchFilters, "sortBy" | "sortOrder">
  ) => {
    setCurrentSort(sortOptions);
  };

  // Handle clear search and filters
  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentFilters({ genre: "all", year: "all" });
    setCurrentSort({ sortBy: "rating", sortOrder: "desc" });
    loadInitialMovies();
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            🎬 Movie Search & Management
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search and Filters */}
        <div className="space-y-3 sm:space-y-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={loading}
            placeholder="Search movies by title, director, or cast..."
          />

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4">
            <FilterPanel
              onFilterChange={handleFilterChange}
              genres={genres}
              currentFilters={currentFilters}
              disabled={!!searchQuery.trim()}
            />
            <SortPanel
              onSortChange={handleSortChange}
              currentSort={currentSort}
              disabled={!!searchQuery.trim()}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleClearSearch}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white
                       flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Clear All
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-6 sm:py-8">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Loading movies...
            </p>
          </div>
        )}

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
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
            <div className="col-span-full text-center py-8 sm:py-12">
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                No movies found. Try adjusting your search or filters!
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

5. SortPanel.tsx - Sorting options
   - Props: onSortChange, currentSort
   - Features: sort options

6. FavoritesList.tsx - Display favorite movies
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
