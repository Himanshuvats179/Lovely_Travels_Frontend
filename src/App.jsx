import { useState } from 'react'
import HotelSearchBar from "./components/HotelSearchBar"
import CabSearchBar from './components/CabSearchBar'
import Home from "./components/Home";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <Home/>
    </div>

  
  )
}

export default App

