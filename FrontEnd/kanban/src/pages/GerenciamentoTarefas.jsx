import "../styles/GerenciamentoTarefas.scss"
import React, { useState, useEffect } from 'react';
import ModalComponent from "../components/Modal";
import axios from "axios";
import Swal from 'sweetalert2'

export default function GerenciamentoTarefas() {
    const url = "http://127.0.0.1:3000/tasks";
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [usuarios, setUsers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [statusChanges, setStatusChanges] = useState({});


    async function viewUsers() {
        try {
            const response = await axios.get("http://127.0.0.1:3000/users");
            console.table(Object.values(response.data));
            setUsers(response.data)
            console.table(response.data)
        } catch (e) {
            console.log(e);
        }

    }

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
        console.table("Modal Aberto");
    };

    const handleUpdateTask = () => {
        const payload = {
            descricao: editingTask.descricao,
            setor: editingTask.setor,
            prioridade: editingTask.prioridade,
            usuario: editingTask.usuario,
        };

        updateTask(editingTask.id, payload);
    };

    const updateTask = async (id, updatedData) => {

        try {
            await axios.patch(`http://127.0.0.1:3000/tasks/${id}`, updatedData);
            console.log("Tarefa atualizada com sucesso!");
            viewTasks();
            setIsModalOpen(false); 
        } catch (e) {
            console.error("Erro ao atualizar tarefa", e);
        }
    };

    async function viewTasks() {
        try {
            const response = await axios.get(url);
            console.table(Object.values(response.data)?.[0]);
            setTasks(response.data)
        } catch (error) {
            console.log("Erro ao buscar tarefas", error);
            return error;
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3000/tasks/${id}`);
            console.log("Tarefa deletada com sucesso");
            viewTasks();
            Swal.fire({
                title: "Terafa deletada com sucesso!",
                icon: "success",
                draggable: true
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        viewTasks()
        viewUsers()
    }, [])


    return (
        <section className="tarefas">
            <h1>Tarefas</h1>

            <div className="colunas">
                <div className="coluna">
                    <h2>A fazer</h2>

                    <div className="cards-column">
                        {tasks.some(task => task.status === "A Fazer") ? (
                            tasks.map(element => (
                                element.status == "A Fazer" && (

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
                                            <span>{element.usuario}</span>
                                        </div>

                                        <div className="opt-actions">
                                            <button onClick={() => openEditModal(element)}>Editar</button>
                                            <button onClick={() => deleteTask(element.id)}>Excluir</button>
                                        </div>

                                        <div className="separador-campo">
                                            <select value={element.status} onChange={(e) => setStatusChanges({
                                                ...statusChanges,
                                                [element.id]: e.target.value
                                            })}>
                                                <option value="A Fazer">A fazer</option>
                                                <option value="Fazendo">Fazendo</option>
                                                <option value="Pronto">Pronto</option>
                                            </select>
                                            <button onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })}>
                                                Alterar Status
                                            </button>

                                        </div>
                                    </div>
                                )

                            ))
                        ) : (
                            <p>Nenhuma tarefa A fazer</p>
                        )}

                    </div>
                </div>
                <div className="coluna">
                    <h2>Fazendo</h2>

                    <div className="cards-column">

                        {tasks.some(task => task.status === "Fazendo") > 0 ? (tasks.map(element => (
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
                                        <span>{element.usuario}</span>
                                    </div>

                                    <div className="opt-actions">
                                        <button>Editar</button>
                                        <button onClick={() => deleteTask(element.id)}>Excluir</button>
                                    </div>

                                    <div className="separador-campo">
                                        <select value={element.status} onChange={(e) => setStatusChanges({
                                            ...statusChanges,
                                            [element.id]: e.target.value
                                        })}>
                                            <option value="A Fazer">A fazer</option>
                                            <option value="Fazendo">Fazendo</option>
                                            <option value="Pronto">Pronto</option>
                                        </select>
                                        <button onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })}>
                                            Alterar Status
                                        </button>

                                    </div>
                                </div>
                            ))

                        )) : (
                            <p>Nehuma tarefa fazendo</p>
                        )}
                    </div>
                </div>
                <div className="coluna">
                    <h2>Pronto</h2>

                    <div className="cards-column">

                        {tasks.some(task => task.status === "Pronto") ? (tasks.map(element => (
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
                                        <span>{element.usuario}</span>
                                    </div>

                                    <div className="opt-actions">
                                        <button>Editar</button>
                                        <button onClick={() => deleteTask(element.id)}>Excluir</button>
                                    </div>

                                    <div className="separador-campo">
                                        <select value={element.status} onChange={(e) => setStatusChanges({
                                            ...statusChanges,
                                            [element.id]: e.target.value
                                        })}>
                                            <option value="A Fazer">A fazer</option>
                                            <option value="Fazendo">Fazendo</option>
                                            <option value="Pronto">Pronto</option>
                                        </select>
                                        <button onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })}>
                                            Alterar Status
                                        </button>

                                    </div>
                                </div>
                            ))

                        )) : (
                            <p>Nenhuma tarefa concluida</p>
                        )}

                    </div>
                </div>

                {isModalOpen && (
                    <ModalComponent onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} >
                        <h2>Editar Tarefa</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateTask();
                            }}
                        >
                            <label>Descrição</label>
                            <input
                                type="text"
                                value={editingTask.descricao}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, descricao: e.target.value })
                                }
                            />

                            <label>Setor</label>
                            <input
                                type="text"
                                value={editingTask.setor}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, setor: e.target.value })
                                }
                            />

                            <label>Prioridade</label>
                            <select
                                value={editingTask.prioridade}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, prioridade: e.target.value })
                                }
                            >
                                <option value="Alta">Alta</option>
                                <option value="Media">Média</option>
                                <option value="Baixa">Baixa</option>
                            </select>

                            <label>Usuário</label>
                            <select
                                value={editingTask.usuario}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, usuario: e.target.value })
                                }
                            >
                                <option value="">Escolha um usuário</option>
                                {usuarios.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.nome}
                                    </option>
                                ))}
                            </select>

                            <div className="btns">
                                <button type="submit" className="saveButton">Salvar</button>
                                <button onClick={() => setIsModalOpen(false)} className="btn-bottom exitBottom">Sair</button>
                            </div>
                        </form>
                    </ModalComponent>
                )}


            </div>


        </section>
    )
}