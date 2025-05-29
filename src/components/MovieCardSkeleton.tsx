export const MovieCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-pulse">
      {/* Poster skeleton */}
      <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700" />

      {/* Content skeleton */}
      <div className="p-3 sm:p-4">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />

        {/* Year and rating skeleton */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        </div>

        {/* Favorite button skeleton */}
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
};
