import "../styles/GerenciamentoTarefas.scss"
import React, { useState, useEffect } from 'react';
import ModalComponent from "../components/Modal";
import axios from "axios";
import Swal from 'sweetalert2'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


export default function GerenciamentoTarefas() {
    const url = "http://127.0.0.1:3000/tasks";
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [usuarios, setUsers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [statusChanges, setStatusChanges] = useState({});

    const editSchema = z.object({
        descricao: z.string().regex(/^(?!.* {2,})[A-Za-z0-9 ]{5,}$/, {
            message: "A descrição deve conter no minimo 5 caracteres. Apenas numeros"
        }),
        setor: z.string().regex(/^(?!.* {2,})[A-Za-z0-9 ]{5,}$/, {
            message: "O setor deve conter ao menos 2 caracteres"
        }),
        usuario: z.preprocess(
            (val) => Number(val), // converte a string do select para number
            z.number().int().min(1, "Escolha um usuário")
        ),
        prioridade: z.string().regex(/^(Alta|Media|Baixa)$/, {
            message: "A prioridade deve ser apenas Alta, Baixa ou Media"
        })
    })

    const {
        register: editRegister,
        handleSubmit: handleEditSubmit,
        formState: { errors: editErrors },
        reset: resetEditForm
    } = useForm({
        resolver: zodResolver(editSchema),
        defaultValues: editingTask || {}
    });

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
        resetEditForm(task); // atualiza os valores do formulário com a tarefa atual
        console.table("Modal aberto");
    };


    const handleUpdateTask = (data) => {
        const payload = {
            descricao: data.descricao,
            setor: data.setor,
            prioridade: data.prioridade,
            usuario: Number(data.usuario) // converte para número se o backend espera number
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
                                            <label className="label-campo" aria-label="Descrição da tarefa">Descrição</label>
                                            <span>{element.descricao}</span>
                                        </div>

                                        <div className="separador-campo">
                                            <label className="label-campo" aria-label="Setor da tarefa">Setor</label>
                                            <span>{element.setor}</span>
                                        </div>

                                        <div className="separador-campo">
                                            <label className="label-campo" aria-label="Nível de prioridade">Prioridade</label>
                                            <span>{element.prioridade}</span>
                                        </div>

                                        <div className="separador-campo">
                                            <label className="label-campo" aria-label="Vinculo da tarefa">Vinculada A</label>
                                            <span>
                                                {usuarios.find(u => u.id == element.usuario)?.nome || "Usuário não encontrado"}
                                            </span>
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
                                            <button onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })} aria-label="Alterar Status">
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
                                        <label className="label-campo" aria-label="Descrição da tarefa">Descrição</label>
                                        <span>{element.descricao}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo" aria-label="Setor da tarefa">Setor</label>
                                        <span>{element.setor}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo" aria-label="Prioridade da tarefa" >Prioridade</label>
                                        <span>{element.prioridade}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo" aria-label="Vinculo da tarefa">Vinculada A</label>
                                        <span>
                                            {usuarios.find(u => u.id == element.usuario)?.nome || "Usuário não encontrado"}
                                        </span>
                                    </div>

                                    <div className="opt-actions">
                                        <button onClick={() => openEditModal(element)} aria-label="Editar tarefa">Editar</button>
                                        <button onClick={() => deleteTask(element.id)} aria-label="Excluir tarefa">Excluir</button>
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
                                        <button onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })} aria-label="Alterar Status">
                                            Alterar Status
                                        </button>

                                    </div>
                                </div>
                            ))

                        )) : (
                            <p>Nehuma tarefa</p>
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
                                        <label className="label-campo" aria-label="Descrição da tarefa">Descrição</label>
                                        <span>{element.descricao}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo" aria-label="Setor da Tarefa">Setor</label>
                                        <span>{element.setor}</span>
                                    </div>

                                    <div className="separador-campo">
                                        <label className="label-campo" aria-label="Prioridade da Tarefa">Prioridade</label>
                                        <span>{element.prioridade}</span>
                                    </div>

                                    <div className="separador-campo" aria-label="Vinculo da tarefa">
                                        <label className="label-campo">Vinculada A</label>
                                        <span>
                                            {usuarios.find(u => u.id == element.usuario)?.nome || "Usuário não encontrado"}
                                        </span>
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
                                        <button onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })} aria-label="Alterar Status">
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
                        <form onSubmit={handleEditSubmit((data) => handleUpdateTask(data))}>
                            <label>Descrição</label>
                            <input type="text" {...editRegister("descricao")} />
                            {editErrors.descricao && <span className="error">{editErrors.descricao.message}</span>}

                            <label>Setor</label>
                            <input type="text" {...editRegister("setor")} />
                            {editErrors.setor && <span className="error">{editErrors.setor.message}</span>}

                            <label>Prioridade</label>
                            <select {...editRegister("prioridade")}>
                                <option value="Alta">Alta</option>
                                <option value="Media">Média</option>
                                <option value="Baixa">Baixa</option>
                            </select>
                            {editErrors.prioridade && <span className="error">{editErrors.prioridade.message}</span>}

                            <label>Usuário</label>
                            <select {...editRegister("usuario")}>
                                <option value="">Escolha um usuário</option>
                                {usuarios.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.nome}
                                    </option>
                                ))}
                            </select>
                            {editErrors.usuario && <span className="error">{editErrors.usuario.message}</span>}

                            <div className="btns">
                                <button type="submit" className="saveButton">Salvar</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-bottom exitBottom">Fechar</button>
                            </div>
                        </form>

                    </ModalComponent>
                )}


            </div>


        </section>
    )
}