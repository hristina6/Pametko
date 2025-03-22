import { useState } from 'react'
import './Sections.css'

function FileButtons() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="file_buttons">
          <button>Import</button>
          <button>Export</button>
          <button>Bag</button>
      </div>
    </>
  )
}

export default FileButtons;
