import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/import', async (req, res) => {
  const problems = req.body;  

  try {
    for (const problem of problems) {
      await pool.query(
        `INSERT INTO math_problems 
        (problem, answer_int, theme, difficulty) 
        VALUES ($1, $2, $3, $4)`,
        [problem.problem, problem.answer_int, problem.theme, problem.difficulty]
      );
    }
    res.status(200).json({ message: 'Успешен импорт!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Грешка при импорт' });
  }
});

export default router;