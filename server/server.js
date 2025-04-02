import express from 'express';
import cors from 'cors';
import importRouter from './routes/import.js';
import pool from './db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api', importRouter);


app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.json({ success: true})
});

// Check if tables exist
app.get('/check-tables', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = tablesResult.rows.map(row => row.table_name);
    const problemsExists = tables.includes('problems');
    
    res.json({
      success: true,
      allTables: tables,
      problemsTableExists: problemsExists,
      message: problemsExists 
        ? 'Problems table exists' 
        : 'Problems table does not exist'
    });
    
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});