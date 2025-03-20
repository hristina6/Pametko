import { useState } from 'react'
import './Sections.css'

function NoteTools() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="notes_tools_section">
        <div className="notes_pencil">
            Pencil
        </div>
        <div className="notes_eraser">
            Eraser
        </div>
      </div>
    </>
  )
}

export default NoteTools;
