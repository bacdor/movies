"use client";

import { SearchFilters } from "@/types/movie";

interface FilterPanelProps {
  onFilterChange: (filters: Pick<SearchFilters, "genre" | "year">) => void;
  genres: string[];
  currentFilters: Pick<SearchFilters, "genre" | "year">;
  disabled?: boolean;
}

export function FilterPanel({
  onFilterChange,
  genres,
  currentFilters,
  disabled = false,
}: FilterPanelProps) {
  const handleFilterChange = (field: "genre" | "year", value: string) => {
    if (disabled) return;
    onFilterChange({
      ...currentFilters,
      [field]: value,
    });
  };

  // Generate year options (from current year down to 1950)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) =>
    (currentYear - i).toString()
  );

  const selectClassName = `px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    text-sm min-w-[120px]
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {disabled ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center mb-2">
          Filters are disabled while searching. Clear the search to use filters.
        </div>
      ) : null}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label
            htmlFor="genre"
            className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            Genre:
          </label>
          <select
            id="genre"
            value={currentFilters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
            className={`${selectClassName} w-full sm:w-auto`}
            disabled={disabled}
          >
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label
            htmlFor="year"
            className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            Year:
          </label>
          <select
            id="year"
            value={currentFilters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className={`${selectClassName} w-full sm:w-auto`}
            disabled={disabled}
          >
            <option value="all">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
