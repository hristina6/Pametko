import { useState } from 'react'
import './Sections.css'

import Pencil from '../assets/Pencil.svg'
import Eraser from '../assets/Eraser.svg'

function NoteTools() {

  return (
    <>
      <div className="notes_tools_section">
        <div className="notes_pencil">
            <img src={Pencil}/>
        </div>
        <div className="notes_eraser">
            <img src={Eraser}/>
        </div>
      </div>
    </>
  )
}

export default NoteTools;
