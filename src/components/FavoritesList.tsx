import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

interface FavoritesListProps {
  movies: Movie[];
  favorites: number[];
  onMovieClick: (movie: Movie) => void;
  onFavoriteToggle: (movieId: number) => void;
}

export function FavoritesList({
  movies,
  favorites,
  onMovieClick,
  onFavoriteToggle,
}: FavoritesListProps) {
  // Filter movies to only show favorites
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  if (favoriteMovies.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          No favorite movies yet. Add some movies to your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
      {favoriteMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={onMovieClick}
          onFavoriteToggle={onFavoriteToggle}
          isFavorite={favorites.includes(movie.id)}
        />
      ))}
    </div>
  );
}
