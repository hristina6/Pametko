import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'uiktp', 
  password: '2002_maj',
  port: 5432,  
});

export default pool;