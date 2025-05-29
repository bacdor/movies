import DatabaseManager from "../database";
import { Movie, SearchFilters } from "@/types/movie";

interface MovieRow {
  id: number;
  title: string;
  year: number;
  description: string;
  rating: number;
  director: string;
  runtime: number;
  release_date: string;
  poster: string;
  genres?: string;
  cast?: string;
}

class MovieService {
  private static mapRowToMovie(row: MovieRow): Movie {
    return {
      id: row.id,
      title: row.title,
      year: row.year,
      genre: row.genres ? row.genres.split(",").filter(Boolean) : [],
      poster: row.poster,
      description: row.description,
      rating: row.rating,
      director: row.director,
      cast: row.cast ? row.cast.split(",").filter(Boolean) : [],
      runtime: row.runtime,
      releaseDate: row.release_date,
    };
  }

  static async getAllMovies(): Promise<Movie[]> {
    const db = await DatabaseManager.getConnection();
    const query = `
      SELECT 
        m.*,
        GROUP_CONCAT(DISTINCT g.name) as genres,
        GROUP_CONCAT(DISTINCT c.actor_name) as cast
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      LEFT JOIN cast_members c ON m.id = c.movie_id
      GROUP BY m.id
      ORDER BY m.rating DESC
    `;
    const rows = await db.all(query);
    return rows.map(this.mapRowToMovie);
  }

  static async getMovieById(id: number): Promise<Movie | null> {
    const db = await DatabaseManager.getConnection();
    const query = `
      SELECT 
        m.*,
        GROUP_CONCAT(DISTINCT g.name) as genres,
        GROUP_CONCAT(DISTINCT c.actor_name) as cast
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      LEFT JOIN cast_members c ON m.id = c.movie_id
      WHERE m.id = ?
      GROUP BY m.id
    `;
    const row = await db.get(query, [id]);
    return row ? this.mapRowToMovie(row) : null;
  }

  static async searchMovies(filters: Partial<SearchFilters>): Promise<Movie[]> {
    const db = await DatabaseManager.getConnection();
    let query = `
      SELECT DISTINCT
        m.*,
        GROUP_CONCAT(DISTINCT g.name) as genres,
        GROUP_CONCAT(DISTINCT c.actor_name) as cast
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      LEFT JOIN cast_members c ON m.id = c.movie_id
    `;

    const conditions: string[] = [];
    const params: any[] = [];

    if (filters.query) {
      conditions.push(`(
        m.title LIKE ? OR 
        m.director LIKE ? OR 
        c.actor_name LIKE ?
      )`);
      const searchTerm = `%${filters.query}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (filters.genre && filters.genre !== "all") {
      conditions.push("g.name = ?");
      params.push(filters.genre);
    }

    if (filters.year && filters.year !== "all") {
      conditions.push("m.year = ?");
      params.push(parseInt(filters.year));
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " GROUP BY m.id";

    if (filters.sortBy) {
      const sortColumn =
        filters.sortBy === "title"
          ? "m.title"
          : filters.sortBy === "year"
          ? "m.year"
          : "m.rating";
      const sortOrder = filters.sortOrder === "desc" ? "DESC" : "ASC";
      query += ` ORDER BY ${sortColumn} ${sortOrder}`;
    } else {
      query += " ORDER BY m.rating DESC";
    }

    const rows = await db.all(query, params);
    return rows.map(this.mapRowToMovie);
  }

  static async getPopularMovies(limit: number = 10): Promise<Movie[]> {
    const db = await DatabaseManager.getConnection();
    const query = `
      SELECT 
        m.*,
        GROUP_CONCAT(DISTINCT g.name) as genres,
        GROUP_CONCAT(DISTINCT c.actor_name) as cast
      FROM movies m
      LEFT JOIN movie_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      LEFT JOIN cast_members c ON m.id = c.movie_id
      GROUP BY m.id
      ORDER BY m.rating DESC
      LIMIT ?
    `;
    const rows = await db.all(query, [limit]);
    return rows.map(this.mapRowToMovie);
  }

  static async getGenres(): Promise<string[]> {
    const db = await DatabaseManager.getConnection();
    const query = "SELECT name FROM genres ORDER BY name";
    const rows = await db.all(query);
    return rows.map((row: { name: string }) => row.name);
  }
}

export { MovieService };
