# API Overview & Setup Guide

## Overview

This Movie Database application provides a comprehensive REST API built with Next.js API routes and SQLite database backend. The application has evolved from mock data to a full database implementation while maintaining the same API interface for seamless development.

## Quick Start

### 1. Database Setup
```bash
# Initialize the database schema
npm run db:init

# Populate with movie data
npm run db:seed

# Start the development server
npm run dev
```

### 2. Verify Setup
Visit [http://localhost:3000/api/movies](http://localhost:3000/api/movies) to see the API in action.

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies (with optional filtering)
- `GET /api/movies/[id]` - Get a specific movie by ID
- `GET /api/movies/search` - Search movies with advanced filters
- `GET /api/movies/popular` - Get popular movies (highest rated)

### Genres
- `GET /api/genres` - Get all available genres

## Query Parameters

For search and filtering endpoints:
- `q` - Search query (searches title, director, cast)
- `genre` - Filter by genre name
- `year` - Filter by year
- `sortBy` - Sort field (title, year, rating)
- `sortOrder` - Sort direction (asc, desc)
- `limit` - Result limit (for popular endpoint)

## Example API Calls

```bash
# Get all movies
curl http://localhost:3000/api/movies

# Search for movies containing "dark"
curl "http://localhost:3000/api/movies/search?q=dark"

# Get Action movies from 2008, sorted by rating
curl "http://localhost:3000/api/movies?genre=Action&year=2008&sortBy=rating&sortOrder=desc"

# Get top 5 popular movies
curl "http://localhost:3000/api/movies/popular?limit=5"

# Get all genres
curl http://localhost:3000/api/genres
```

## Client-Side API Usage

The `MovieAPI` class provides a clean interface for API calls:

```typescript
import { MovieAPI } from '@/lib/api';

// Search movies
const movies = await MovieAPI.searchMovies({
  query: 'batman',
  genre: 'Action',
  sortBy: 'rating'
});

// Get specific movie
const movie = await MovieAPI.getMovieById(1);

// Get popular movies
const popular = await MovieAPI.getPopularMovies(6);

// Get all genres
const genres = await MovieAPI.getGenres();
```

## Data Structure

All API endpoints return data in the following format:

```typescript
interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  poster: string;
  description: string;
  rating: number;
  director: string;
  cast: string[];
  runtime: number;
  releaseDate: string;
}

interface SearchFilters {
  query: string;
  genre: string;
  year: string;
  sortBy: 'title' | 'year' | 'rating';
  sortOrder: 'asc' | 'desc';
}
```

## Database Implementation

### Architecture
The application uses **SQLite** with a normalized schema for optimal performance:

#### Tables
- **movies** - Core movie information
- **genres** - Normalized genre storage
- **movie_genres** - Many-to-many movie-genre relationships
- **cast_members** - Movie cast information

#### Database Scripts
- `npm run db:init` - Create database tables and indexes
- `npm run db:seed` - Populate with movie data
- `npm run db:reset` - Reset database (removes all data)

### Database Schema

```sql
-- Movies table with core movie information
CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT NOT NULL,
  rating REAL NOT NULL,
  director TEXT NOT NULL,
  runtime INTEGER NOT NULL,
  release_date TEXT NOT NULL,
  poster TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Genres table for normalized genre storage
CREATE TABLE genres (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- Many-to-many relationship between movies and genres
CREATE TABLE movie_genres (
  movie_id INTEGER,
  genre_id INTEGER,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- Cast members for each movie
CREATE TABLE cast_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_id INTEGER,
  actor_name TEXT NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);
```

### Performance Features
- **Indexes**: Strategic indexing on frequently queried columns
- **Connection Pooling**: Singleton database connection pattern
- **Query Optimization**: Efficient JOINs and GROUP BY operations
- **Data Aggregation**: GROUP_CONCAT for related data in single queries

## Data Access Layer (DAL)

The application uses a Data Access Layer pattern for database operations:

### Location
`src/lib/dal/movieDAL.ts`

### Key Methods

```typescript
import { MovieDAL } from '@/lib/dal/movieDAL';

// Get all movies
const movies = await MovieDAL.getAllMovies();

// Search with filters
const searchResults = await MovieDAL.searchMovies({
  query: 'batman',
  genre: 'Action',
  year: '2008',
  sortBy: 'rating',
  sortOrder: 'desc'
});

// Get specific movie
const movie = await MovieDAL.getMovieById(1);

// Get popular movies
const popular = await MovieDAL.getPopularMovies(6);

// Get all genres
const genres = await MovieDAL.getAllGenres();
```

## Database Connection Management

### Connection Manager
`src/lib/database.ts`

The application uses a singleton pattern for database connections:

```typescript
import DatabaseManager from '@/lib/database';

// Get connection (automatically creates if needed)
const db = await DatabaseManager.getConnection();

// Test connection
const isConnected = await DatabaseManager.testConnection();

// Close connection (usually not needed)
await DatabaseManager.closeConnection();
```

### Features
- **Singleton Pattern**: One connection per application instance
- **Auto-reconnection**: Automatically handles connection failures
- **Foreign Key Support**: Enables referential integrity
- **Error Handling**: Comprehensive error handling and logging

## Development Workflow

### Adding New Movies

1. **Option A: Modify Seed Script**
   ```javascript
   // Edit scripts/seed-db.js
   const newMovie = {
     id: 11,
     title: "New Movie",
     year: 2024,
     genre: ["Action", "Sci-Fi"],
     // ... other properties
   };
   mockMovies.push(newMovie);
   ```

2. **Option B: Direct Database Insert**
   ```sql
   INSERT INTO movies (title, year, description, rating, director, runtime, release_date, poster)
   VALUES ('New Movie', 2024, 'Description', 8.5, 'Director', 120, '2024-01-01', 'poster-url');
   ```

3. **Reset and Reseed**
   ```bash
   npm run db:reset
   npm run db:init
   npm run db:seed
   ```

### Database Inspection

You can inspect the database using any SQLite client:

```bash
# Using sqlite3 command line
sqlite3 movies.db

# List tables
.tables

# Describe table structure
.schema movies

# Query data
SELECT * FROM movies LIMIT 5;
```

## Troubleshooting

### Database Issues
```bash
# If database is missing or corrupted
npm run db:reset
npm run db:init
npm run db:seed
```

### API Not Working
1. Ensure database is initialized: `npm run db:init`
2. Check if data is seeded: `npm run db:seed`
3. Verify server is running: `npm run dev`

### Common Database Errors

#### Database File Not Found
```bash
Error: SQLITE_CANTOPEN: unable to open database file
```
**Solution**: Run `npm run db:init` to create the database.

#### Permission Errors
```bash
Error: SQLITE_READONLY: attempt to write a readonly database
```
**Solution**: Check file permissions on the database file and directory.

#### Foreign Key Constraint Errors
```bash
Error: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed
```
**Solution**: Ensure referenced records exist before creating relationships.

### Performance Issues
- Database includes optimized indexes for all search operations
- Connection pooling handles concurrent requests efficiently
- Queries are optimized for the assessment dataset size

## Advanced Usage

### Custom Queries
The Data Access Layer (`src/lib/dal/movieDAL.ts`) can be extended for custom queries:

```typescript
// Example: Get movies by decade
static async getMoviesByDecade(decade: number): Promise<Movie[]> {
  const startYear = decade;
  const endYear = decade + 9;
  
  return this.searchMovies({
    // Custom filtering logic
  });
}
```

### API Extensions
New endpoints can be added in `src/app/api/` following the existing patterns.

### Debug Mode

Enable detailed logging by setting environment variable:
```bash
DEBUG=database npm run dev
```

This API implementation elevates the assessment from a simple frontend exercise to a full-stack development experience, providing valuable learning opportunities while maintaining focus on the core assessment objectives. 