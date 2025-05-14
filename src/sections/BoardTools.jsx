import { useState } from 'react'
import './Sections.css'

import Chalk from '../assets/Chalk.svg'
import Sponge from '../assets/Sponge.svg'

function BoardTools() {

  return (
    <>
      <div className="board_tools_section">
        <div className="board_chalk">
            <img src={Chalk}/>
        </div>
        <div className="board_sponge">
            <img src={Sponge}/>
        </div>
      </div>
    </>
  )
}

export default BoardTools;
