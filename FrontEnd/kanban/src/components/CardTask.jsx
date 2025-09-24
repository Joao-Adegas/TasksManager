import { DroggableCard } from "./DroggableCard";

export default function CardTask({ 
    element, 
    usuarios, 
    statusChanges, 
    setStatusChanges, 
    openEditModal, 
    deleteTask, 
    updateTask 
}) {
    return (
        <DroggableCard id={element.id}>
            <div className="card-tarefa">
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
                    <button onClick={() => openEditModal(element)} aria-label="Editar tarefa">
                        Editar
                    </button>
                    <button onClick={() => deleteTask(element.id)} aria-label="Excluir tarefa">
                        Excluir
                    </button>
                </div>

                <div className="separador-campo">
                    <select 
                        value={statusChanges[element.id] || element.status} 
                        onChange={(e) => setStatusChanges({
                            ...statusChanges,
                            [element.id]: e.target.value
                        })}
                    >
                        <option value="A Fazer">A fazer</option>
                        <option value="Fazendo">Fazendo</option>
                        <option value="Pronto">Pronto</option>
                    </select>
                    <button 
                        onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })} 
                        aria-label="Alterar Status"
                    >
                        Alterar Status
                    </button>
                </div>
            </div>
        </DroggableCard>
    );
}