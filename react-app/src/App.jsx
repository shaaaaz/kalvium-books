import './App.css'
import './components/Components.css'

import { Route,Routes } from 'react-router-dom'

import HomePage from './components/HomePage'
import Form from './components/Form'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/form' element={<Form />} />
        </Routes>
    </>
  )
}

export default App
