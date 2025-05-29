const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file path
const dbPath = path.join(process.cwd(), "movies.db");

console.log("🌱 Seeding Movie Database...");

// Mock movie data (from existing mockMovies.ts)
const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    poster: "https://via.placeholder.com/300x450/4A90E2/FFFFFF?text=Shawshank",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    runtime: 142,
    releaseDate: "1994-09-23",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    poster: "https://via.placeholder.com/300x450/E74C3C/FFFFFF?text=Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    runtime: 175,
    releaseDate: "1972-03-24",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    poster:
      "https://via.placeholder.com/300x450/2C3E50/FFFFFF?text=Dark+Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    rating: 9.0,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    runtime: 152,
    releaseDate: "2008-07-18",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    poster:
      "https://via.placeholder.com/300x450/F39C12/FFFFFF?text=Pulp+Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    rating: 8.9,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    runtime: 154,
    releaseDate: "1994-10-14",
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    poster:
      "https://via.placeholder.com/300x450/27AE60/FFFFFF?text=Forrest+Gump",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
    rating: 8.8,
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    runtime: 142,
    releaseDate: "1994-07-06",
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    poster: "https://via.placeholder.com/300x450/8E44AD/FFFFFF?text=Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    rating: 8.8,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    runtime: 148,
    releaseDate: "2010-07-16",
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    poster: "https://via.placeholder.com/300x450/16A085/FFFFFF?text=The+Matrix",
    description:
      "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality.",
    rating: 8.7,
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    runtime: 136,
    releaseDate: "1999-03-31",
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    poster: "https://via.placeholder.com/300x450/D35400/FFFFFF?text=Goodfellas",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    rating: 8.7,
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    runtime: 146,
    releaseDate: "1990-09-21",
  },
  {
    id: 9,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    poster:
      "https://via.placeholder.com/300x450/34495E/FFFFFF?text=Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    runtime: 169,
    releaseDate: "2014-11-07",
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    genre: ["Action", "Adventure", "Drama"],
    poster:
      "https://via.placeholder.com/300x450/9B59B6/FFFFFF?text=LOTR+Return",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom.",
    rating: 8.9,
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    runtime: 201,
    releaseDate: "2003-12-17",
  },
];

// Create database connection
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err.message);
    console.log('💡 Make sure to run "npm run db:init" first');
    process.exit(1);
  }
  console.log("✅ Connected to SQLite database");
});

// Helper function to get or create genre
function getOrCreateGenre(genreName, callback) {
  db.get("SELECT id FROM genres WHERE name = ?", [genreName], (err, row) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (row) {
      callback(null, row.id);
    } else {
      db.run(
        "INSERT OR IGNORE INTO genres (name) VALUES (?)",
        [genreName],
        function (err) {
          if (err) {
            callback(err, null);
          } else {
            // If INSERT OR IGNORE didn't insert (because it already exists), get the existing ID
            if (this.lastID === 0) {
              db.get(
                "SELECT id FROM genres WHERE name = ?",
                [genreName],
                (err, row) => {
                  if (err) {
                    callback(err, null);
                  } else {
                    callback(null, row.id);
                  }
                }
              );
            } else {
              callback(null, this.lastID);
            }
          }
        }
      );
    }
  });
}

// Seed the database
db.serialize(() => {
  console.log("🧹 Clearing existing data...");

  // Clear existing data
  db.run("DELETE FROM cast_members");
  db.run("DELETE FROM movie_genres");
  db.run("DELETE FROM movies");
  db.run("DELETE FROM genres");

  console.log("📽️ Inserting movies...");

  let moviesProcessed = 0;
  const totalMovies = mockMovies.length;

  mockMovies.forEach((movie) => {
    // Insert movie
    const movieSql = `
      INSERT INTO movies (id, title, year, description, rating, director, runtime, release_date, poster)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      movieSql,
      [
        movie.id,
        movie.title,
        movie.year,
        movie.description,
        movie.rating,
        movie.director,
        movie.runtime,
        movie.releaseDate,
        movie.poster,
      ],
      function (err) {
        if (err) {
          console.error(
            `❌ Error inserting movie "${movie.title}":`,
            err.message
          );
          return;
        }

        console.log(`✅ Inserted movie: ${movie.title}`);

        // Insert genres
        let genresProcessed = 0;
        movie.genre.forEach((genreName) => {
          getOrCreateGenre(genreName, (err, genreId) => {
            if (err) {
              console.error(`❌ Error with genre "${genreName}":`, err.message);
              return;
            }

            // Link movie to genre
            db.run(
              "INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)",
              [movie.id, genreId],
              (err) => {
                if (err) {
                  console.error(
                    `❌ Error linking genre "${genreName}" to movie:`,
                    err.message
                  );
                }

                genresProcessed++;
                if (genresProcessed === movie.genre.length) {
                  // Insert cast members
                  let castProcessed = 0;
                  movie.cast.forEach((actorName) => {
                    db.run(
                      "INSERT INTO cast_members (movie_id, actor_name) VALUES (?, ?)",
                      [movie.id, actorName],
                      (err) => {
                        if (err) {
                          console.error(
                            `❌ Error inserting cast member "${actorName}":`,
                            err.message
                          );
                        }

                        castProcessed++;
                        if (castProcessed === movie.cast.length) {
                          moviesProcessed++;
                          if (moviesProcessed === totalMovies) {
                            console.log("🎉 Database seeding complete!");
                            console.log(
                              `📊 Inserted ${totalMovies} movies with genres and cast`
                            );

                            // Close database
                            db.close((err) => {
                              if (err) {
                                console.error(
                                  "❌ Error closing database:",
                                  err.message
                                );
                              } else {
                                console.log("✅ Database connection closed");
                              }
                            });
                          }
                        }
                      }
                    );
                  });
                }
              }
            );
          });
        });
      }
    );
  });
});
