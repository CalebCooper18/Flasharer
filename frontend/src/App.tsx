import './App.css'
import {Routes, Route, Link } from 'react-router-dom'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<h2>Hello world</h2>} />
        <Route path='/test' element={<h3>Routes are workking</h3>} />
      </Routes>
    </>
  )
}

export default App
