import "../styles/CadTarefas.scss"
import "../styles/CadUsuario.scss"
import {useState,useEffect,useRef} from "react"
import axios from 'axios'

export default function CadastroTarefas(){
    const url = "http://127.0.0.1:3000/tasks";
    const [users,setUsers] = useState([]);

    const usuarios = [
        "João Silva", "Maria Santos", "Pedro Costa", "Ana Oliveira",
        "Carlos Lima", "Lucia Ferreira", "Roberto Silva", "Fernanda Costa"
    ];

    const prioridade = ["Alta","Media","Baixa"];

    async function viewUsers(){
        try{
            const response = await axios.get("http://127.0.0.1:3000/users");
            console.log(Object.values(response.data));
            setUsers(response.data)
        }catch(e){
            console.log(e);
        }
    
    }

    async function createTask(taskData) {
        try {
            const response = await axios.post(url, taskData)
            console.log("Tarefa criada com sucesso!! ");
        } catch (e) {
            return e
        }
    }

    useEffect(()=>{
        viewUsers();
    },[])

    return(
        <section className="section-form">
            <div className="container-form">

                <h1 className="title-form">Cadastro de Tarefas</h1>

                <form className="form" onSubmit={createTask}>

                    <div className="input">
                        <label>Descrição</label>
                        <input type="text"/>
                    </div>

                    <div className="input">
                        <label>Setor</label>
                        <input type="text"/>
                    </div>

                    <div className="input">
                        <label>Usuário</label>
                        <select>
                                {users.map(a =>(
                                <option value={a.nome} key={a.id}>{a.nome}</option>
                            ))}

                        </select>
                    </div>

                    <div className="input">
                        <label>Prioridade</label>
                        <select>
                            {prioridade.map(a =>(
                                <option value={a} key={a}>{a}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn">Cadastrar</button>
                </form>
            </div>
        </section>
    )
}