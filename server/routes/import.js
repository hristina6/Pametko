import express from 'express';
import pool from '../db.js';
import { uploadImage } from '../cloudinary.js';

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

router.get('/bag', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM problems');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

router.post('/save-answer', async (req, res) => {
  const { problem, answer_int, theme, difficulty, answer_img, notes_img } = req.body;
  
  if (!problem || answer_int === undefined || !theme || !difficulty) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }

  console.log('Received answer image data length:', answer_img ? answer_img.length : 0);
  console.log('Received notes image data length:', notes_img ? notes_img.length : 0);
  console.log('Answer int:', answer_int);
  console.log('Theme:', theme);
  console.log('Difficulty:', difficulty);

  const client = await pool.connect();
  try {
    // 1. Upload the answer image to Cloudinary if available
    let answerCloudinaryResult;
    let answerImageUrl = null;
    
    if (answer_img) {
      try {
        answerCloudinaryResult = await uploadImage(answer_img, 'uiktp-answers');
        answerImageUrl = answerCloudinaryResult.secure_url;
        console.log('Answer image uploaded to Cloudinary:', answerImageUrl);
      } catch (uploadError) {
        console.error('Failed to upload answer image to Cloudinary:', uploadError);
      }
    }
    
    // 2. Upload the notes image to Cloudinary if available
    let notesCloudinaryResult;
    let notesImageUrl = null;
    
    if (notes_img) {
      try {
        notesCloudinaryResult = await uploadImage(notes_img, 'uiktp-notes');
        notesImageUrl = notesCloudinaryResult.secure_url;
        console.log('Notes image uploaded to Cloudinary:', notesImageUrl);
      } catch (uploadError) {
        console.error('Failed to upload notes image to Cloudinary:', uploadError);
      }
    }
  
    // Process the base64 data before storage
    // Convert data URL to just base64 content for storage efficiency if needed
    let processedAnswerImageData = answer_img;
    if (answer_img && answer_img.startsWith('data:image') && answer_img.includes('base64,')) {
      processedAnswerImageData = answer_img.split('base64,')[1];
    }
    
    let processedNotesImageData = notes_img;
    if (notes_img && notes_img.startsWith('data:image') && notes_img.includes('base64,')) {
      processedNotesImageData = notes_img.split('base64,')[1];
    }
    
    console.log('Saving to database with answer URL:', answerImageUrl);
    console.log('Saving to database with notes URL:', notesImageUrl);
    
    const result = await client.query(
      `INSERT INTO problems 
      (problem, answer_int, theme, difficulty, answer_img, notes_img, answer_image_url, notes_image_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, problem, answer_image_url, notes_image_url`,
      [problem, answer_int, theme, difficulty, processedAnswerImageData, processedNotesImageData, answerImageUrl, notesImageUrl]
    );
    
    console.log('Inserted row:', result.rows[0]);
    
    res.status(200).json({ 
      success: true, 
      message: 'Problem saved successfully',
      id: result.rows[0].id,
      answerCloudinary: answerCloudinaryResult ? true : false,
      notesCloudinary: notesCloudinaryResult ? true : false,
      answerImageUrl: answerImageUrl,
      notesImageUrl: notesImageUrl
    });
  } catch (err) {
    console.error('Error saving problem:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

export default router;