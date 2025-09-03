import "../styles/CadTarefas.scss"
import "../styles/CadUsuario.scss"
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function CadastroTarefas() {
    const url = "http://127.0.0.1:3000/tasks";
    const [users, setUsers] = useState([]);

    const prioridade = ["Alta", "Media", "Baixa"];

    const schema = z.object({
        descricao: z.string().regex(/^.{5,}$/,{
            message:"A descrição deve conter no minimo 5 caracteres"
        }),
        setor: z.string().regex(/^.{2,}$/,{
            message:"O setor deve conter ao menos 2 caracteres"
        }),
        usuario: z.string().nonempty("Escolha um usuário"),
        prioridade: z.string().regex(/^(Alta|Media|Baixa)$/,{
            message:"A prioridade deve ser apenas Alta, Baixa ou Media"
        })
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    async function viewUsers() {
        try {
            const response = await axios.get("http://127.0.0.1:3000/users");
            console.table(Object.values(response.data));
            setUsers(response.data)
        } catch (e) {
            console.log(e);
        }

    }

    const createTask = async (data) => {

        try {
            const response = await axios.post(url, data)
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

    useEffect(() => {
        viewUsers();
    }, [])

    return (
        <section className="section-form">
            <div className="container-form">

                <h1 className="title-form">Cadastro de Tarefas</h1>

                <form className="form" onSubmit={handleSubmit(createTask)}>

                    <div className="input">
                        <label>Descrição</label>
                        <input type="text" {...register("descricao")} />
                        {errors.descricao && <span className="error">{errors.descricao.message}</span>}
                    </div>

                    <div className="input">
                        <label>Setor</label>
                        <input type="text" {...register("setor")} />
                        {errors.setor && <span className="error">{errors.setor.message}</span>}
                    </div>

                    <div className="input">
                        <label>Usuário</label>
                        <select {...register("usuario")} >
                            <option value="">Selecione um Usuário</option>
                            {users.map((u) => (
                                <option value={u.id} key={u.id}>{u.nome}</option>
                            ))}
                        </select>
                        {errors.usuario && <span className="error">{errors.usuario.message}</span>}
                    </div>


                    <div className="input">
                        <label>Prioridade</label>
                        <select {...register("prioridade")}>
                            <option defaultChecked>Selecione uma prioridade</option>
                            {prioridade.map(a => (
                                <option value={a} key={a}>{a}</option>
                            ))}
                        </select>
                        {errors.prioridade && <span className="error">{errors.prioridade.message}</span>}
                    </div>
                    <button className="btn" type="submit">Cadastrar</button>
                </form>
            </div>
        </section>
    )
}