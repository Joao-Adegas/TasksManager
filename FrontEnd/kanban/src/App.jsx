import { BrowserRouter , Route, Routes} from "react-router-dom";
import CadastroUsuario from './pages/CadastroUsuario';
import CadastroTarefas from "./pages/CadastroTarefas";
import GerenciamentoTarefas from "./pages/GerenciamentoTarefas";
import Header from "./components/Header";
import Layout from './components/Layout';
import './App.css';

function App() {


  return (
      <BrowserRouter>
        <Routes>
              <Route path='/' element={<Layout/>}>
                <Route index element={<GerenciamentoTarefas/>}/>
                <Route path="cadusuario" element={<CadastroUsuario/>}/>
                <Route path="cadtarefas" element={<CadastroTarefas/>}/>
                <Route path="gerenciamento_tarefas" index element={<GerenciamentoTarefas/>}/>
              </Route>
        </Routes>
      </BrowserRouter>    
  )
}

export default App
