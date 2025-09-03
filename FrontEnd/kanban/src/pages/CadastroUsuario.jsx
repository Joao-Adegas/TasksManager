import "../styles/CadUsuario.scss"
import axios from "axios"
import { useState, useEffect, useRef } from "react"
import Swal from 'sweetalert2'

export default function CadastroUsuario() {
    const [users, setUsers] = useState([]);
    const nomeRef = useRef();
    const emailRef = useRef();

    const createUsers = async (e) => {
        e.preventDefault();

        const userData = {
            nome: nomeRef.current.value,
            email: emailRef.current.value
        }

        try {
            const response = await axios.post("http://127.0.0.1:3000/users", userData);
            console.log("Usuário criado com sucesso!!");
            Swal.fire({
                title: "Cadastro concluído com sucesso!",
                icon: "success",
                draggable: true,
                customClass: {
                    popup: "meu-popup",
                    title: "meu-titulo",
                    content: "meu-conteudo",
                    confirmButton: "meu-botao"
                }
            });
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <section className="section-form">
            <div className="container-form">
                <h1 className="title-form">Cadastro de Usuário</h1>
                <form className="form" onSubmit={createUsers}>

                    <div className="input">
                        <label>Nome:</label>
                        <input type="text" ref={nomeRef} />
                    </div>

                    <div className="input">
                        <label>Email:</label>
                        <input type="text" ref={emailRef} />
                    </div>
                    <button className="btn" type="submit">Cadastrar</button>
                </form>
            </div>
        </section>
    )
}