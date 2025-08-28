import { useState } from 'react'
import { BrowserRouter , Route, Routes} from "react-router-dom"
import reactLogo from './assets/react.svg'
import CadastroUsuario from './pages/cadastroUsuario'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Header/>}>
              
            </Route> 
        </Routes>
      </BrowserRouter>    
  )
}

export default App
