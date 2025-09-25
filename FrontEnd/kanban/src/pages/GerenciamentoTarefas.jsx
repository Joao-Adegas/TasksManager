import "../styles/GerenciamentoTarefas.scss"
import React, { useState, useEffect } from 'react';
import ModalComponent from "../components/Modal";
import CardTask from "../components/CardTask";
import { DroppableColumn } from "../components/DroppableColumn";
import axios from "axios";
import Swal from 'sweetalert2'
import { DndContext, useDraggable, closestCenter } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


function DraggableCardWrapper({ element, ...props }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: element.id });

  // aplica apenas rotação, mas mantém transform do dnd-kit
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${isDragging ? 0 : 0}deg)`
      : undefined,
    transition: isDragging ? "none" : "transform 0.1s ease",
    cursor: isDragging ? "grabbing" : "grab"
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CardTask element={element} {...props} />
    </div>
  );
}


export default function GerenciamentoTarefas() {
    const url = "http://127.0.0.1:3000/tasks";
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [usuarios, setUsers] = useState([]);
    const [statusChanges, setStatusChanges] = useState({});

    const editSchema = z.object({
        descricao: z.string().regex(/^(?!.* {2,})[A-Za-z0-9 ]{5,}$/, { message: "A descrição deve conter no minimo 5 caracteres." }),
        setor: z.string().regex(/^(?!.* {2,})[A-Za-z0-9 ]{5,}$/, { message: "O setor deve conter ao menos 5 caracteres" }),
        usuario: z.preprocess(val => Number(val), z.number().int().min(1, "Escolha um usuário")),
        prioridade: z.string().regex(/^(Alta|Media|Baixa)$/, { message: "A prioridade deve ser Alta, Media ou Baixa" })
    });

    const { register: editRegister, handleSubmit: handleEditSubmit, formState: { errors: editErrors }, reset: resetEditForm } = useForm({
        resolver: zodResolver(editSchema),
        defaultValues: editingTask || {}
    });

    useEffect(() => {
        viewTasks();
        viewUsers();
    }, []);

    async function viewUsers() {
        try {
            const response = await axios.get("http://127.0.0.1:3000/users");
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function viewTasks() {
        try {
            const response = await axios.get(url);
            setTasks(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
        resetEditForm(task);
    };

    const handleUpdateTask = (data) => {
        const payload = {
            descricao: data.descricao,
            setor: data.setor,
            prioridade: data.prioridade,
            usuario: Number(data.usuario)
        };
        updateTask(editingTask.id, payload);
    };

    const updateTask = async (id, updatedData) => {
        try {
            await axios.patch(`http://127.0.0.1:3000/tasks/${id}`, updatedData);
            viewTasks();
            setIsModalOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/tasks/${id}`);
            viewTasks();
            Swal.fire({ title: "Tarefa deletada com sucesso!", icon: "success", draggable: true });
        } catch (e) {
            console.log(e);
        }
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;
        const taskID = Number(active.id);
        const newStatus = over.id;
        const task = tasks.find(t => t.id === taskID);
        if (task && task.status !== newStatus) updateTask(taskID, { status: newStatus });
    };

    return (
        <section className="tarefas">
            <h1>Tarefas</h1>
            <DndContext
                onDragEnd={handleDragEnd}
              
            >
                <div className="colunas">
                    {["A Fazer", "Fazendo", "Pronto"].map(status => (
                        <div key={status} className="coluna">
                            <h2>{status}</h2>
                            <DroppableColumn id={status}>
                                {tasks.some(t => t.status === status) ? (
                                    tasks.filter(t => t.status === status).map(element => (
                                        <DraggableCardWrapper
                                            key={element.id}
                                            element={element}
                                            usuarios={usuarios}
                                            statusChanges={statusChanges}
                                            setStatusChanges={setStatusChanges}
                                            openEditModal={openEditModal}
                                            deleteTask={deleteTask}
                                            updateTask={updateTask}
                                        />
                                    ))
                                ) : (<p>Nenhuma tarefa</p>)}
                            </DroppableColumn>
                        </div>
                    ))}
                </div>
            </DndContext>

            {isModalOpen && (
                <ModalComponent onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
                    <h2>Editar Tarefa</h2>
                    <form onSubmit={handleEditSubmit(handleUpdateTask)}>
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
                            {usuarios.map(user => (
                                <option key={user.id} value={user.id}>{user.nome}</option>
                            ))}
                        </select>
                        {editErrors.usuario && <span className="error">{editErrors.usuario.message}</span>}

                        <div className="btns">
                            <button type="submit" className="saveButton buttonModal">Salvar</button>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-bottom exitBottom buttonModal">Fechar</button>
                        </div>
                    </form>
                </ModalComponent>
            )}
        </section>
    );
}
