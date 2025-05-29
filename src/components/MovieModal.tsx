"use client";

import { Movie } from "@/types/movie";
import { useState } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const [imageError, setImageError] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {movie.title}
            </h2>
            <button
              onClick={onClose}
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
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 text-center p-4">
                    No image available
                  </p>
                </div>
              ) : (
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  className="rounded-lg object-cover w-full h-full"
                  onError={() => setImageError(true)}
                />
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Details
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {movie.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Info
                </h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-gray-500 dark:text-gray-400">Year</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {movie.year}
                  </dd>

                  <dt className="text-gray-500 dark:text-gray-400">Director</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {movie.director}
                  </dd>

                  <dt className="text-gray-500 dark:text-gray-400">Runtime</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {movie.runtime} minutes
                  </dd>

                  <dt className="text-gray-500 dark:text-gray-400">Rating</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {movie.rating.toFixed(1)}
                  </dd>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre) => (
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
                  {movie.cast.map((actor) => (
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
  );
}
