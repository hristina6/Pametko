import { useState } from 'react';
import { Link } from 'react-router';
import './Sections.css'

function FileButtons() {

  return (
    <>
        <div className="right_section">
            <div className="file_buttons">
<<<<<<< HEAD
              <button>Import</button>
=======
            <Link to="/import"><button>Import</button></Link>
>>>>>>> 81776d2 (Adding import, local data base and server)
              <button>Export</button>
                <Link to="/bag"><button>Bag</button></Link>
            </div>
            <div className="kid_placeholder">
<<<<<<< HEAD
                <img src="src/assets/Kid.svg"/>
=======
                <img src="src/assets/kid_image_demo.png"/>
>>>>>>> 81776d2 (Adding import, local data base and server)
            </div>
        </div>
    </>
  )
}

export default FileButtons;
