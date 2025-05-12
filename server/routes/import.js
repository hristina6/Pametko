import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/import', async (req, res) => {
  console.log('Data:', JSON.stringify(req.body, null, 2));

  const client = await pool.connect();
try {
  const insertedIds = [];
  for (const problem of req.body) {
    const result = await client.query(
      `INSERT INTO problems 
      (problem, answer_int, theme, difficulty) 
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
      [problem.problem, problem.answer_int, problem.theme, problem.difficulty]
    );
    insertedIds.push(result.rows[0].id);
  }
  res.status(200).json({ success: true, message: `Successfully inserted ${insertedIds.length} rows`, ids: insertedIds });
} catch (err) {
  console.error(err);
  res.status(500).json({ success: false, error: err.message });
} finally {
  client.release();
}
});



export default router;