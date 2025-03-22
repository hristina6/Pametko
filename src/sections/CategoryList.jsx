import { useState } from 'react'
import './Sections.css'

function CategoryList() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="categories">
          <ul>
              <li><button>SUM</button></li>
              <li><button>SUBTRACT</button></li>
              <li><button>MULTIPLY</button></li>
              <li><button>DIVIDE</button></li>
          </ul>
      </div>
    </>
  )
}

export default CategoryList;
