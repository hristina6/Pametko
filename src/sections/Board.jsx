import { useState } from 'react'
import './Sections.css'

function Board() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="board_section">
        <div className="equation_value">
            Equation =
        </div>
        <div className="solution_canvas">

        </div>
      </div>
    </>
  )
}

export default Board;
