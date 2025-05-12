import { useState } from 'react'
import './Sections.css'

function NoteTools() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="notes_tools_section">
        <div className="notes_pencil">
            <img src="src/assets/Pencil.svg"/>
        </div>
        <div className="notes_eraser">
            <img src="src/assets/Eraser.svg"/>
        </div>
      </div>
    </>
  )
}

export default NoteTools;
