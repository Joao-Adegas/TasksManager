import "../styles/GerenciamentoTarefas.scss"

export default function GerenciamentoTarefas() {
    return (
        <section className="tarefas">
            <h1>Tarefas</h1>

            <div className="colunas">
                <div className="coluna">
                    <h2>A fazer</h2>

                    <div className="cards-column">

                        <div className="card-tarefa">

                            <div className="separador-campo">
                                <label className="label-campo">Descrição</label>
                                <span>Descrição da tarefa de alta prioridade</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Setor</label>
                                <span>Setor Y</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Prioridade</label>
                                <span>Alta</span>
                            </div>
                            
                            <div className="separador-campo">
                                <label className="label-campo">Vinculada A</label>
                                <span>Usuário A</span>
                            </div>

                            <div className="opt-actions">
                                <button>Editar</button>
                                <button>Excluir</button>
                            </div>

                            <div className="separador-campo">
                                <select>
                                    <option>A Fazer</option>
                                </select>
                                <button>Alterar Status</button>
                            </div>
                        </div>
                        
                        <div className="card-tarefa">

                            <div className="separador-campo">
                                <label className="label-campo">Descrição</label>
                                <span>Descrição da tarefa de alta prioridade</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Setor</label>
                                <span>Setor Y</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Prioridade</label>
                                <span>Alta</span>
                            </div>
                            
                            <div className="separador-campo">
                                <label className="label-campo">Vinculada A</label>
                                <span>Usuário A</span>
                            </div>

                            <div className="opt-actions">
                                <button>Editar</button>
                                <button>Excluir</button>
                            </div>

                            <div className="separador-campo">
                                <select>
                                    <option>A Fazer</option>
                                </select>
                                <button>Alterar Status</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="coluna">
                    <h2>Fazendo</h2>

                    <div className="cards-column">

                       <div className="card-tarefa">

                            <div className="separador-campo">
                                <label className="label-campo">Descrição</label>
                                <span>Descrição da tarefa de alta prioridade</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Setor</label>
                                <span>Setor Y</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Prioridade</label>
                                <span>Alta</span>
                            </div>
                            
                            <div className="separador-campo">
                                <label className="label-campo">Vinculada A</label>
                                <span>Usuário A</span>
                            </div>

                            <div className="opt-actions">
                                <button>Editar</button>
                                <button>Excluir</button>
                            </div>

                            <div className="separador-campo">
                                <select>
                                    <option>A Fazer</option>
                                </select>
                                <button>Alterar Status</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="coluna">
                    <h2>Pronto</h2>

                    <div className="cards-column">
                           <div className="card-tarefa">

                            <div className="separador-campo">
                                <label className="label-campo">Descrição</label>
                                <span>Descrição da tarefa de alta prioridade</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Setor</label>
                                <span>Setor Y</span>
                            </div>

                            <div className="separador-campo">
                                <label className="label-campo">Prioridade</label>
                                <span>Alta</span>
                            </div>
                            
                            <div className="separador-campo">
                                <label className="label-campo">Vinculada A</label>
                                <span>Usuário A</span>
                            </div>

                            <div className="opt-actions">
                                <button>Editar</button>
                                <button>Excluir</button>
                            </div>

                            <div className="separador-campo">
                                <select>
                                    <option>A Fazer</option>
                                </select>
                                <button>Alterar Status</button>
                            </div>
                        </div>  

                    </div>
                </div>
            </div>
        </section>
    )
}