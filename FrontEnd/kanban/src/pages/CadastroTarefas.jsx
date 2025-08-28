import "../styles/CadTarefas.scss"
import "../styles/CadUsuario.scss"

export default function CadastroTarefas(){
    return(
        <section className="cadTarefas">
            <div className="container-form">

                <h1>Cadastro de Tarefas</h1>

                <form className="form">

                    <div className="input">
                        <label>Descrição</label>
                        <input type="text"/>
                    </div>

                    <div className="input">
                        <label>Setor</label>
                        <input type="text"/>
                    </div>

                    <div className="input">
                        <label>Usuário</label>
                        <select>
                            <option>João</option>

                        </select>
                    </div>

                    <div className="input">
                        <label>Prioridade</label>
                        <select>
                            <option>Baixa</option>
                        </select>
                    </div>
                    <button className="btn">Cadastrar</button>
                </form>
            </div>
        </section>
    )
}