import { DroggableCard } from "./DroggableCard";
import "../styles/CardTask.scss"

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
            <div className="card-tarefa" >

                <div className="separador-campo">
                    <label className="label-campo"  >Descrição</label>
                    <span>{element.descricao}</span>
                </div>

                <div className="separador-campo">
                    <label className="label-campo"  >Setor</label>
                    <span>{element.setor}</span>
                </div>

                <div className="separador-campo">
                    <label className="label-campo"  >Prioridade</label>
                    <span>{element.prioridade}</span>
                </div>

                <div className="separador-campo">
                    <label className="label-campo">Vinculada A</label>
                    <span>
                        {usuarios.find(u => u.id == element.usuario)?.nome || "Usuário não encontrado"}
                    </span>
                </div>

                <div className="opt-actions">

                    <button 
                        onClick={(e) => { openEditModal(element) }}
                        onPointerDown={(e) => {e.stopPropagation(); e.preventDefault();}} 
                        onKeyDown={(e)=>{e.stopPropagation();}}>
                        Editar
                    </button>

                    <button 
                        onClick={(e) => {deleteTask(element.id) }} 
                        onPointerDown={(e) =>  {e.stopPropagation(); e.preventDefault() }}
                        onKeyDown={(e)=>{e.stopPropagation();}}>
                        Excluir
                    </button>
                </div>

                <div className="separador-campo">
                    
                    <select
                        id={`status-${element.id}`}
                        value={statusChanges[element.id] || element.status}
                        onChange={(e) => setStatusChanges({...statusChanges, [element.id]: e.target.value})}
                        onPointerDown={(e) =>  {e.stopPropagation(); }}
                        onKeyDown={(e)=>{e.stopPropagation();}}
                          aria-label="Status da tarefa" >
                        <option value="A Fazer">A fazer</option>
                        <option value="Fazendo">Fazendo</option>
                        <option value="Pronto">Pronto</option>

                    </select>

                    <button
                        onClick={() => updateTask(element.id, { status: statusChanges[element.id] || element.status })}
                        onPointerDown={(e) => {e.preventDefault(); e.stopPropagation();}}
                        onKeyDown={(e)=>{e.stopPropagation();}}>
                        Alterar Status
                    </button>

                </div>

            </div>

        </DroggableCard>

    );
}