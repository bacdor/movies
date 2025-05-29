"use client";

import { useState, useEffect } from "react";
// Import your components here
// import { MovieAPI } from '@/lib/api';
// import { Movie } from '@/types/movie';

export default function MovieApp() {
  // State management - Add your state here
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load initial movies on component mount
  useEffect(() => {
    // TODO: Load popular movies or all movies initially
    // Example: loadPopularMovies();
  }, []);

  // TODO: Implement search functionality
  const handleSearch = async (query: string) => {
    // Implement movie search using MovieAPI.searchMovies()
  };

  // TODO: Implement other handlers
  // - handleMovieClick (for movie details)
  // - handleFavoriteToggle (for favorites)
  // - handleFilterChange (for filtering)

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
        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search movies, directors, or cast..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        {/* Filters Section (Optional) */}
        <div className="mb-8">
          {/* TODO: Add genre filter, year filter, sort options */}
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
          {/* TODO: Map through movies and render MovieCard components */}
          {movies.length === 0 && !loading && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No movies found. Try searching for something!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Movie Detail Modal (Optional) */}
      {/* TODO: Add modal for movie details */}
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
