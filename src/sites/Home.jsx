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
            </div>
            <div className="file_options">
                <FileButtons></FileButtons>
            </div>
        </div>
    </>
  )
}

export default Home
