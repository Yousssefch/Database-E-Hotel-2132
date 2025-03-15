import { Client } from 'pg';

// Database connection parameters
const client = new Client({
  host: 'db-assignment-b-base.duckdns.org',
  port: 5050,
  user: 'user',
  password: 'winter2025',
  database: 'E_Hotel', 
});

// Connect to the PostgreSQL server
export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Successfully connected to the database!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from the database:', res.rows[0]);

  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await client.end();
  }
}

