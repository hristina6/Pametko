import { useEffect, useState } from 'react';
import './Sites.css';

function Bag() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bag')
      .then(res => res.json())
      .then(data => setProblems(data))
      .catch(err => console.error('Failed to fetch problems:', err));
  }, []);

  return (
    <div className="bag">
      <ul>
        {problems.map((problem) => (
          <li className="note_paper" key={problem.id}>
            <div className="note_problem_info">
                <p><strong>ID:</strong> {problem.id}</p>
                <p><strong>Theme:</strong> {problem.theme}</p>
                <p><strong>Difficulty:</strong> {problem.difficulty}</p>
                <p><strong>Solution:</strong> {problem.answer_int}</p>
            </div>
            <p><strong>Problem:</strong> {problem.problem}</p>
            <div className="note_problem_images">
<p><strong>Answer Image:</strong> 
  {problem.answer_image_url 
    ? <img 
        src={problem.answer_image_url}
        alt="Answer" 
        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
        onError={(e) => {
          console.error('Cloudinary URL load error, falling back to base64:', e);
          // Fall back to base64 image if available
          if (problem.answer_img) {
            // Check if the string already has the data:image prefix
            const base64Src = problem.answer_img.includes('data:image') 
              ? problem.answer_img 
              : `data:image/png;base64,${problem.answer_img}`;
            e.target.src = base64Src;
          } else {
            e.target.style.display = 'none';
            e.target.insertAdjacentHTML('afterend', '<div>Error loading image</div>');
          }
        }}
      /> 
    : 'None'}
</p>
                <p><strong>Notes Image:</strong></p>
  {problem.notes_image_url 
    ? <img 
        src={problem.notes_image_url}
        alt="Notes" 
        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
        onError={(e) => {
          console.error('Cloudinary Notes URL load error, falling back to base64:', e);
          // Fall back to base64 image if available
          if (problem.notes_img) {
            // Check if the string already has the data:image prefix
            const base64Src = problem.notes_img.includes('data:image') 
              ? problem.notes_img 
              : `data:image/png;base64,${problem.notes_img}`;
            e.target.src = base64Src;
          } else {
            e.target.style.display = 'none';
            e.target.insertAdjacentHTML('afterend', '<div>Error loading image</div>');
          }
        }}
      /> 
    : problem.notes_img 
      ? <img 
          src={problem.notes_img.includes('data:image') 
            ? problem.notes_img 
            : `data:image/png;base64,${problem.notes_img}`}
          alt="Notes" 
          style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
          onError={(e) => {
            console.error('Notes image load error:', e);
            e.target.style.display = 'none';
            e.target.insertAdjacentHTML('afterend', '<div>Error loading image</div>');
          }}
        />
      : 'None'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bag;
