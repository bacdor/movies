const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Database file path
const dbPath = path.join(process.cwd(), 'movies.db');

console.log('🔄 Resetting Movie Database...');

// Check if database exists
if (fs.existsSync(dbPath)) {
  console.log('🗑️ Removing existing database file...');
  fs.unlinkSync(dbPath);
  console.log('✅ Database file removed');
} else {
  console.log('ℹ️ No existing database file found');
}

console.log('🚀 Database reset complete!');
console.log('💡 Run "npm run db:init" to create a fresh database');
console.log('💡 Then run "npm run db:seed" to populate with data'); 