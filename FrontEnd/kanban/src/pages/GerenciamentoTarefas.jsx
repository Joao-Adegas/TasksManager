import "../styles/GerenciamentoTarefas.scss"
import React, { useState } from 'react';

export default function GerenciamentoTarefas() {
    const [tarefas, setTarefas] = useState([
        {
            id: 1,
            titulo: "Implementar sistema de autenticação",
            descricao: "Criar sistema completo de login e cadastro com validação",
            setor: "Desenvolvimento",
            prioridade: "Alta",
            status: "A fazer",
            vinculadaA: "João Silva",
            dataCreacao: "2024-01-15",
            prazo: "2024-01-30"
        },
        {
            id: 2,
            titulo: "Revisar documentação do projeto",
            descricao: "Atualizar toda documentação técnica e manual do usuário",
            setor: "Documentação",
            prioridade: "Média",
            status: "Fazendo",
            vinculadaA: "Maria Santos",
            dataCreacao: "2024-01-10",
            prazo: "2024-01-25"
        },
        {
            id: 3,
            titulo: "Desenvolver interface do dashboard",
            descricao: "Criar layout responsivo para o painel administrativo",
            setor: "Design/Frontend",
            prioridade: "Alta",
            status: "Fazendo",
            vinculadaA: "Pedro Costa",
            dataCreacao: "2024-01-12",
            prazo: "2024-01-28"
        },
        {
            id: 4,
            titulo: "Configurar banco de dados",
            descricao: "Estruturar tabelas e relacionamentos do sistema",
            setor: "Backend",
            prioridade: "Alta",
            status: "Pronto",
            vinculadaA: "Ana Oliveira",
            dataCreacao: "2024-01-05",
            prazo: "2024-01-20"
        },
        {
            id: 5,
            titulo: "Testes de performance",
            descricao: "Executar testes de carga e otimizar consultas SQL",
            setor: "QA",
            prioridade: "Média",
            status: "A fazer",
            vinculadaA: "Carlos Lima",
            dataCreacao: "2024-01-14",
            prazo: "2024-02-05"
        },
        {
            id: 6,
            titulo: "Deploy em produção",
            descricao: "Configurar servidor e fazer deploy da aplicação",
            setor: "DevOps",
            prioridade: "Alta",
            status: "A fazer",
            vinculadaA: "Lucia Ferreira",
            dataCreacao: "2024-01-16",
            prazo: "2024-02-10"
        },
        {
            id: 7,
            titulo: "Criar manual do usuário",
            descricao: "Documentar todas as funcionalidades para usuários finais",
            setor: "Documentação",
            prioridade: "Baixa",
            status: "A fazer",
            vinculadaA: "Roberto Silva",
            dataCreacao: "2024-01-08",
            prazo: "2024-02-15"
        },
        {
            id: 8,
            titulo: "Implementar notificações",
            descricao: "Sistema de notificações via email e push",
            setor: "Backend",
            prioridade: "Média",
            status: "Pronto",
            vinculadaA: "Fernanda Costa",
            dataCreacao: "2024-01-03",
            prazo: "2024-01-22"
        }
    ]);

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

    const status = ["A Fazer","Fazendo","Pronto"];


    return (
        <section className="tarefas">
            <h1>Tarefas</h1>

            <div className="colunas">
                <div className="coluna">
                    <h2>A fazer</h2>

                    <div className="cards-column">

                        {tarefas.map(element => (
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

                        {tarefas.map(element => (
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

                        {tarefas.map(element => (
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