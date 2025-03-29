import { useState } from 'react'
import './Sites.css'
import CategoryList from "../sections/CategoryList.jsx";
import FileButtons from "../sections/FileButtons.jsx";

function Home() {

  return (
    <>
        <div className="home">
            <div className="category_signs">
                <CategoryList></CategoryList>
            </div>
            <div className="school_empty">
<<<<<<< HEAD
=======
                .
>>>>>>> 81776d2 (Adding import, local data base and server)
            </div>
            <div className="file_options">
                <FileButtons></FileButtons>
            </div>
        </div>
    </>
  )
}

export default Home
