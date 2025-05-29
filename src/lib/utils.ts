export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getYearFromDate(dateString: string): number {
  return new Date(dateString).getFullYear();
}

// Local storage helpers for favorites
export function getFavorites(): number[] {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('movieFavorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function addToFavorites(movieId: number): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }
}

export function removeFromFavorites(movieId: number): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  const updated = favorites.filter(id => id !== movieId);
  localStorage.setItem('movieFavorites', JSON.stringify(updated));
}

export function isFavorite(movieId: number): boolean {
  return getFavorites().includes(movieId);
} 