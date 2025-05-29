"use client";

import { useState, useEffect } from "react";
import { SearchFilters } from "@/types/movie";

interface FilterPanelProps {
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  genres: string[];
  disabled?: boolean;
}

export function FilterPanel({
  onFilterChange,
  genres,
  disabled = false,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<Partial<SearchFilters>>({
    genre: "all",
    year: "all",
    sortBy: "rating",
    sortOrder: "desc",
  });

  // Generate year options (last 50 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) =>
    (currentYear - i).toString()
  );

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const selectClassName = `px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Genre Filter */}
      <select
        value={filters.genre}
        onChange={(e) => handleFilterChange("genre", e.target.value)}
        className={selectClassName}
        disabled={disabled}
      >
        <option value="all">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Year Filter */}
      <select
        value={filters.year}
        onChange={(e) => handleFilterChange("year", e.target.value)}
        className={selectClassName}
        disabled={disabled}
      >
        <option value="all">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Sort By */}
      <select
        value={filters.sortBy}
        onChange={(e) =>
          handleFilterChange(
            "sortBy",
            e.target.value as "title" | "year" | "rating"
          )
        }
        className={selectClassName}
        disabled={disabled}
      >
        <option value="title">Title</option>
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </select>

      {/* Sort Order */}
      <select
        value={filters.sortOrder}
        onChange={(e) =>
          handleFilterChange("sortOrder", e.target.value as "asc" | "desc")
        }
        className={selectClassName}
        disabled={disabled}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {disabled && (
        <div className="col-span-full text-sm text-gray-500 dark:text-gray-400 text-center">
          Filters are disabled while searching
        </div>
      )}
    </div>
  );
}
