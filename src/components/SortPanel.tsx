"use client";

import { SearchFilters } from "@/types/movie";

interface SortPanelProps {
  onSortChange: (
    sortOptions: Pick<SearchFilters, "sortBy" | "sortOrder">
  ) => void;
  currentSort: Pick<SearchFilters, "sortBy" | "sortOrder">;
  disabled?: boolean;
}

export function SortPanel({
  onSortChange,
  currentSort,
  disabled = false,
}: SortPanelProps) {
  const handleSortChange = (field: "sortBy" | "sortOrder", value: string) => {
    if (disabled) return;
    onSortChange({
      ...currentSort,
      [field]: value,
    });
  };

  const selectClassName = `px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    focus:ring-2 focus:ring-blue-500 focus:border-transparent
    text-sm
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {disabled ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center mb-2">
          Sorting is disabled while searching. Clear the search to use sorting.
        </div>
      ) : null}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label
            htmlFor="sortBy"
            className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            Sort by:
          </label>
          <select
            id="sortBy"
            value={currentSort.sortBy}
            onChange={(e) => handleSortChange("sortBy", e.target.value)}
            className={`${selectClassName} w-full sm:w-auto`}
            disabled={disabled}
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label
            htmlFor="sortOrder"
            className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${
              disabled ? "opacity-50" : ""
            }`}
          >
            Order:
          </label>
          <select
            id="sortOrder"
            value={currentSort.sortOrder}
            onChange={(e) => handleSortChange("sortOrder", e.target.value)}
            className={`${selectClassName} w-full sm:w-auto`}
            disabled={disabled}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}
