import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <h1>MERN Stack | Workshop</h1>
        <button className='btn btn-success' >bootstrap</button>
    </div>
  )
}

export default App
