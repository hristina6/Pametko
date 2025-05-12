import { useState } from 'react';
import { Link } from 'react-router';
import './Sections.css'

function FileButtons() {

  return (
    <>
        <div className="right_section">
            <div className="file_buttons">
              <button>Import</button>
              <button>Export</button>
                <Link to="/bag"><button>Bag</button></Link>
            </div>
            <div className="kid_placeholder">
                <img src="src/assets/Kid.svg"/>
            </div>
        </div>
    </>
  )
}

export default FileButtons;
