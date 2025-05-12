import { useState } from 'react'
import './Sections.css'

function BoardTools() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="board_tools_section">
        <div className="board_chalk">
            <img src="src/assets/Chalk.svg"/>
        </div>
        <div className="board_sponge">
            <img src="src/assets/Sponge.svg"/>
        </div>
      </div>
    </>
  )
}

export default BoardTools;
