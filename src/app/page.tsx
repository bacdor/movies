"use client";

import { useState, useEffect } from "react";
import { MovieAPI } from "@/lib/api";
import { Movie } from "@/types/movie";
import { MovieCard } from "@/components/MovieCard";

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

  // Load initial movies and favorites on component mount
  useEffect(() => {
    loadInitialMovies();
    loadFavorites();
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

  // Handle search
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadInitialMovies();
      return;
    }

    try {
      setLoading(true);
      const response = await MovieAPI.searchMovies({ query });
      setMovies(response.movies);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle favorite toggle
  const handleFavoriteToggle = (movieId: number) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    saveFavorites(newFavorites);
  };

  // Handle movie click
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
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
              onMovieClick={handleMovieClick}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedMovie.title}
                </h2>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-[2/3] w-full">
                  <img
                    src={selectedMovie.poster}
                    alt={`${selectedMovie.title} poster`}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Details
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedMovie.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Info
                    </h3>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-gray-500 dark:text-gray-400">Year</dt>
                      <dd className="text-gray-900 dark:text-white">
                        {selectedMovie.year}
                      </dd>

                      <dt className="text-gray-500 dark:text-gray-400">
                        Director
                      </dt>
                      <dd className="text-gray-900 dark:text-white">
                        {selectedMovie.director}
                      </dd>

                      <dt className="text-gray-500 dark:text-gray-400">
                        Runtime
                      </dt>
                      <dd className="text-gray-900 dark:text-white">
                        {selectedMovie.runtime} minutes
                      </dd>

                      <dt className="text-gray-500 dark:text-gray-400">
                        Rating
                      </dt>
                      <dd className="text-gray-900 dark:text-white">
                        {selectedMovie.rating.toFixed(1)}
                      </dd>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.genre.map((genre) => (
                        <span
                          key={genre}
                          className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Cast
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.cast.map((actor) => (
                        <span
                          key={actor}
                          className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
