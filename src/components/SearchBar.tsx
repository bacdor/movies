"use client";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  onSearch,
  placeholder = "Search movies...",
  isLoading = false,
}: SearchBarProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        {searchQuery && (
          <button
            onClick={() => {
              onSearchChange("");
              onSearch();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 disabled:opacity-50 disabled:cursor-not-allowed
                 flex items-center gap-2 min-w-[100px] justify-center"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Searching...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <span>Search</span>
          </>
        )}
      </button>
    </div>
  );
}
