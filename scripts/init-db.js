const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(process.cwd(), 'movies.db');

console.log('🎬 Initializing Movie Database...');
console.log(`Database path: ${dbPath}`);

// Create database connection
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('❌ Error creating database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database');
});

// Database schema
const schema = {
  movies: `
    CREATE TABLE IF NOT EXISTS movies (
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
    )
  `,
  
  genres: `
    CREATE TABLE IF NOT EXISTS genres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )
  `,
  
  movie_genres: `
    CREATE TABLE IF NOT EXISTS movie_genres (
      movie_id INTEGER,
      genre_id INTEGER,
      PRIMARY KEY (movie_id, genre_id),
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
      FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
    )
  `,
  
  cast_members: `
    CREATE TABLE IF NOT EXISTS cast_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      movie_id INTEGER,
      actor_name TEXT NOT NULL,
      FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
    )
  `
};

// Create indexes
const indexes = [
  'CREATE INDEX IF NOT EXISTS idx_movies_title ON movies(title)',
  'CREATE INDEX IF NOT EXISTS idx_movies_year ON movies(year)',
  'CREATE INDEX IF NOT EXISTS idx_movies_rating ON movies(rating)',
  'CREATE INDEX IF NOT EXISTS idx_movies_director ON movies(director)',
  'CREATE INDEX IF NOT EXISTS idx_cast_actor_name ON cast_members(actor_name)',
  'CREATE INDEX IF NOT EXISTS idx_movie_genres_movie_id ON movie_genres(movie_id)',
  'CREATE INDEX IF NOT EXISTS idx_movie_genres_genre_id ON movie_genres(genre_id)'
];

// Execute schema creation
db.serialize(() => {
  console.log('📋 Creating tables...');
  
  // Create tables
  Object.entries(schema).forEach(([tableName, sql]) => {
    db.run(sql, (err) => {
      if (err) {
        console.error(`❌ Error creating ${tableName} table:`, err.message);
      } else {
        console.log(`✅ Created ${tableName} table`);
      }
    });
  });
  
  // Create indexes
  console.log('🔍 Creating indexes...');
  indexes.forEach((indexSql, i) => {
    db.run(indexSql, (err) => {
      if (err) {
        console.error(`❌ Error creating index ${i + 1}:`, err.message);
      } else {
        console.log(`✅ Created index ${i + 1}`);
      }
    });
  });
  
  // Close database
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
    } else {
      console.log('✅ Database initialization complete!');
      console.log('🚀 Run "npm run db:seed" to populate with movie data');
    }
  });
}); 