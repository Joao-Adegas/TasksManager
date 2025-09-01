import "../styles/CadTarefas.scss"
import "../styles/CadUsuario.scss"
import {useState,useEffect,useRef} from "react"
import axios from 'axios'
import Swal from 'sweetalert2'

export default function CadastroTarefas(){
    const url = "http://127.0.0.1:3000/tasks";
    const [users,setUsers] = useState([]);

    const descricaoRef = useRef();
    const setorRef = useRef();
    const usuarioRef = useRef();
    const prioridadeRef = useRef();
    const vinculoRef = useRef();


    const usuarios = [
        "João Silva", "Maria Santos", "Pedro Costa", "Ana Oliveira",
        "Carlos Lima", "Lucia Ferreira", "Roberto Silva", "Fernanda Costa"
    ];

    const prioridade = ["Alta","Media","Baixa"];

    async function viewUsers(){
        try{
            const response = await axios.get("http://127.0.0.1:3000/users");
            console.table(Object.values(response.data));
            setUsers(response.data)
        }catch(e){
            console.log(e);
        }
    
    }

    const createTask = async(e) => {
        e.preventDefault();

        const taskData = {
            descricao:descricaoRef.current.value,
            setor:setorRef.current.value,
            prioridade:prioridadeRef.current.value,
            usuario: usuarioRef.current.value,
        }

        try {
            const response = await axios.post(url, taskData)
            console.table("Tarefa criada com sucesso!! ");
            Swal.fire({
                title: "Tarefa criada com sucesso!",
                icon: "success",
                draggable: true
            });
        } catch (e) {
            console.table(e)
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
                        <input type="text" ref={descricaoRef}/>
                    </div>

                    <div className="input">
                        <label>Setor</label>
                        <input type="text" ref={setorRef}/>
                    </div>

                    <div className="input">
                        <label>Usuário</label>
                        <select ref={usuarioRef}>
                                <option defaultChecked>Selecione um Usuário</option>
                                {users.map(a =>(
                                <option value={a.nome} key={a.id}>{a.nome}</option>
                            ))}

                        </select>
                    </div>

                    <div className="input">
                        <label>Prioridade</label>
                        <select ref={prioridadeRef}>
                            <option defaultChecked>Selecione uma prioridade</option>
                            {prioridade.map(a =>(
                                <option value={a} key={a}>{a}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn" type="submit">Cadastrar</button>
                </form>
            </div>
        </section>
    )
}