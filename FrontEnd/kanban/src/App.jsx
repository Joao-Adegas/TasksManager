import { useState } from 'react';
import { BrowserRouter , Route, Routes} from "react-router-dom";
import reactLogo from './assets/react.svg';
import CadastroUsuario from './pages/cadastroUsuario';
import viteLogo from '/vite.svg';
import Header from "./components/Header";
import Layout from './components/Layout';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
              <Route path='/' element={<Layout/>}>
                <Route path="cadusuario" element={<CadastroUsuario/>}/>
              </Route>
        </Routes>
      </BrowserRouter>    
  )
}

export default App
