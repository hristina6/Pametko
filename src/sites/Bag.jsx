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
                <p><strong>Answer Image:</strong> {problem.answer_img ? <img src={problem.answer_img} alt="Answer" /> : 'None'}</p>
                <p><strong>Notes Image:</strong> {problem.notes_img ? <img src={problem.notes_img} alt="Notes" /> : 'None'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bag;
