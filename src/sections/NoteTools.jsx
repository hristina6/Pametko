import './Sections.css'

import Pencil from '../assets/Pencil.svg'
import Eraser from '../assets/Eraser.svg'

function NoteTools({ notebookRef }) {
  const handleClearNotebook = () => {
    if (notebookRef && notebookRef.current) {
      const canvas = notebookRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <>
      <div className="notes_tools_section">
        <div className="notes_pencil">
            <img src={Pencil}/>
        </div>
        <div className="notes_eraser" onClick={handleClearNotebook} style={{ cursor: 'pointer' }}>
            <img src={Eraser}/>
        </div>
      </div>
    </>  )
}

export default NoteTools;
