import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

class DatabaseManager {
  private static instance: Database | null = null;
  private static dbPath = path.join(process.cwd(), 'movies.db');

  static async getConnection(): Promise<Database> {
    if (!this.instance) {
      try {
        this.instance = await open({
          filename: this.dbPath,
          driver: sqlite3.Database,
        });
        
        // Enable foreign keys
        await this.instance.exec('PRAGMA foreign_keys = ON');
        
        console.log('✅ Database connection established');
      } catch (error) {
        console.error('❌ Failed to connect to database:', error);
        throw new Error('Database connection failed');
      }
    }
    return this.instance;
  }

  static async closeConnection(): Promise<void> {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
      console.log('✅ Database connection closed');
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      const db = await this.getConnection();
      await db.get('SELECT 1');
      return true;
    } catch (error) {
      console.error('❌ Database connection test failed:', error);
      return false;
    }
  }
}

export default DatabaseManager; 