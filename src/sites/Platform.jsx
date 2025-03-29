import { useState } from 'react'
import './Sites.css'
import Board from "../sections/Board.jsx";
import BoardTools from "../sections/BoardTools.jsx";
import NoteTools from "../sections/NoteTools.jsx";

function Platform() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="platform">
<<<<<<< HEAD
            <div className="breadcrumbs">Breadcrumbs</div>
            <div className="door"><a href="/"><img alt="back_button" src="src/assets/BackButton.svg"/></a></div>
            <div className="board"><Board></Board></div>
            <div className="board_tools"><BoardTools></BoardTools></div>
            <div className="info"><img alt="Pametko" src="src/assets/Kid.svg"/></div>
            <div className="note_tools"><NoteTools></NoteTools></div>
            <div className="notebook"></div>
=======
            <div className="breadcrumbs">.</div>
            <div className="door">.</div>
            <div className="board"><Board></Board></div>
            <div className="board_tools"><BoardTools></BoardTools></div>
            <div className="info">.</div>
            <div className="note_tools"><NoteTools></NoteTools></div>
            <div className="notebook">.</div>
            <div className="boy">.</div>

>>>>>>> 81776d2 (Adding import, local data base and server)
        </div>
    </>
  )
}

export default Platform;
