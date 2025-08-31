import "../styles/GerenciamentoTarefas.scss"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { viewTasks, createTask } from "../api/tasks";

export default function GerenciamentoTarefas() {
    const url = "http://127.0.0.1:3000/tasks";
    const [tasks, setTasks] = useState([]);

    // USUÁRIOS SIMULADOS
    const usuarios = [
        "João Silva", "Maria Santos", "Pedro Costa", "Ana Oliveira",
        "Carlos Lima", "Lucia Ferreira", "Roberto Silva", "Fernanda Costa"
    ];

    // SETORES SIMULADOS
    const setores = [
        "Desenvolvimento", "Design/Frontend", "Backend", "QA",
        "DevOps", "Documentação", "Marketing", "Vendas"
    ];

    const status = ["A Fazer", "Fazendo", "Pronto"];

    async function viewTasks() {
        try {
            const response = await axios.get(url);
            console.log(Object.values(response.data)?.[0]);
            setTasks(response.data)
        } catch (error) {
            console.log("Erro ao buscar tarefas", error);
            return error;
        }
    }



    // async function deleteTask(id) {
    //     try{
    //         const response = await axios.delete(url/id);

    //     }
        
    // }


    useEffect(() => {
        viewTasks()
    }, [])


    return (
        <section className="tarefas">
            <h1>Tarefas</h1>

            <div className="colunas">
                <div className="coluna">
                    <h2>A fazer</h2>

                    <div className="cards-column">

                        {tasks.map(element => (
                            element.status == "A fazer" && (

                                <div className="card-tarefa" key={element.id}>

                                    <div className="separador-campo">
                                        <label className="label-campo">Descrição</label>
                                        <span>{element.descricao}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Setor</label>
                                        <span>{element.setor}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Prioridade</label>
                                        <span>{element.prioridade}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Vinculada A</label>
                                        <span>{element.vinculadaA}</span>
                                    </div>

                                    <div className="opt-actions">
                                        <button>Editar</button>
                                        <button>Excluir</button>
                                    </div>

                                    <div className="separador-campo">
                                        <select>
                                            <option>{element.status}</option>
                                        </select>
                                        <button>Alterar Status</button>
                                    </div>
                                </div>
                            )

                        ))}

                    </div>
                </div>
                <div className="coluna">
                    <h2>Fazendo</h2>

                    <div className="cards-column">

                        {tasks.map(element => (
                            element.status == "Fazendo" && (

                                <div className="card-tarefa" key={element.id}>

                                    <div className="separador-campo">
                                        <label className="label-campo">Descrição</label>
                                        <span>{element.descricao}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Setor</label>
                                        <span>{element.setor}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Prioridade</label>
                                        <span>{element.prioridade}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Vinculada A</label>
                                        <span>{element.vinculadaA}</span>
                                    </div>

                                    <div className="opt-actions">
                                        <button>Editar</button>
                                        <button>Excluir</button>
                                    </div>

                                    <div className="separador-campo">
                                        <select>
                                            <option>{element.status}</option>
                                        </select>
                                        <button>Alterar Status</button>
                                    </div>
                                </div>
                            )

                        ))}
                    </div>
                </div>
                <div className="coluna">
                    <h2>Pronto</h2>

                    <div className="cards-column">

                        {tasks.map(element => (
                            element.status == "Pronto" && (

                                <div className="card-tarefa" key={element.id}>

                                    <div className="separador-campo">
                                        <label className="label-campo">Descrição</label>
                                        <span>{element.descricao}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Setor</label>
                                        <span>{element.setor}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Prioridade</label>
                                        <span>{element.prioridade}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo">Vinculada A</label>
                                        <span>{element.vinculadaA}</span>
                                    </div>

                                    <div className="opt-actions">
                                        <button>Editar</button>
                                        <button>Excluir</button>
                                    </div>

                                    <div className="separador-campo">
                                        <select>
                                            <option>{element.status}</option>
                                        </select>
                                        <button>Alterar Status</button>
                                    </div>
                                </div>
                            )

                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}