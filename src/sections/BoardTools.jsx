import { useState } from 'react'
import './Sections.css'

function BoardTools() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="board_tools_section">
        <div className="board_chalk">
            Chalk
        </div>
        <div className="board_sponge">
            Sponge
        </div>
      </div>
    </>
  )
}

export default BoardTools;
