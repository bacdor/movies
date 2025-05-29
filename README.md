# Movie Database Assessment

A Next.js application for browsing and searching movies with a SQLite database backend.

## Features

- Browse movies with search and filtering capabilities
- View detailed movie information
- Filter by genre, year, and rating
- Sort by title, year, or rating
- Responsive design with modern UI

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with better-sqlite3
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fe-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run db:init
```

4. Seed the database with movie data:
```bash
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API & Database

For comprehensive information about the API endpoints, database setup, and usage examples, see [API_OVERVIEW.md](./API_OVERVIEW.md).

## Database Management

The application uses SQLite for data persistence. Use following scripts are available:

- `npm run db:init` - Initialize the database schema
- `npm run db:seed` - Populate the database with movie data
- `npm run db:reset` - Reset the database (removes all data)

## API Endpoints

The application provides the following REST API endpoints:

### Movies
- `GET /api/movies` - Get all movies (with optional filtering)
- `GET /api/movies/[id]` - Get a specific movie by ID
- `GET /api/movies/search` - Search movies with advanced filters
- `GET /api/movies/popular` - Get popular movies (highest rated)

### Genres
- `GET /api/genres` - Get all available genres

### Query Parameters

For search and filtering endpoints:
- `q` - Search query (searches title, director, cast)
- `genre` - Filter by genre
- `year` - Filter by year
- `sortBy` - Sort by field (title, year, rating)
- `sortOrder` - Sort order (asc, desc)
- `limit` - Limit results (for popular endpoint)

## Project Structure

```
├── README.md                           # Quick start guide
├── ASSESSMENT_INSTRUCTIONS.md          # Complete instructions
├── API_OVERVIEW.md                     # API & Database guide
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── movies/
│   │   │   │   ├── route.ts            # Main movies endpoint
│   │   │   │   ├── [id]/route.ts       # Individual movie endpoint
│   │   │   │   ├── search/route.ts     # Search endpoint
│   │   │   │   └── popular/route.ts    # Popular movies endpoint
│   │   │   └── genres/
│   │   │       └── route.ts            # Genres endpoint
│   ├── lib/
│   │   ├── database.ts                 # Database connection manager
│   │   ├── dal/
│   │   │   └── movieDAL.ts             # Data Access Layer
│   │   └── api.ts                      # Client-side API wrapper
│   └── types/
│       └── movie.ts                    # TypeScript interfaces
├── scripts/
│   ├── init-db.js                      # Database initialization
│   ├── seed-db.js                      # Data seeding
│   └── reset-db.js                     # Database reset
└── movies.db                           # SQLite database file
├── package.json                        # Dependencies
└── tsconfig.json                       # TypeScript config
```

## Development

### Adding New Movies

Movies can be added by modifying the seed script in `scripts/seed-db.js` and running:

```bash
npm run db:reset
npm run db:init
npm run db:seed
```

### Database Schema

The application uses a normalized database schema:

- `movies` - Main movie information
- `genres` - Available genres
- `movie_genres` - Many-to-many relationship between movies and genres
- `cast_members` - Movie cast information

## Building for Production

```bash
npm run build
npm start
```

## Assessment Instructions

For detailed assessment instructions, see [ASSESSMENT_INSTRUCTIONS.md](./ASSESSMENT_INSTRUCTIONS.md).