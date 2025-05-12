import pg from 'pg';
// import fs from 'fs';

const { Pool } = pg;

const pool = new Pool({
  host: "ikt-db-server.postgres.database.azure.com",
  user: "admin_ikt",
  password: "Iktproject1-", 
  database: "ikt-project", 
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;