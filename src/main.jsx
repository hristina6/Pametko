import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from "react-router";
import './index.css'
import Home from  './sites/Home.jsx'
import Platform from  './sites/Platform.jsx'
import Bag from './sites/Bag.jsx'
import Import from './sections/Import';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/import" element={<Import />} />
              <Route path="/" element={<Home />} />
              {/*<Route path="/platform" element={<Platform/>} />*/}
              <Route path="/platform/:category" element={<Platform/>} />
              <Route path="/bag" element={<Bag/>} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
