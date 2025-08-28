import "../styles/Header.scss"

export default function header(){
    return(
        <header>
            <div className="titlle">
                <h1 className="tittle-h1">Gerenciamento de Tarefas</h1>
            </div>
            <nav>
                <ul className="ul-list">
                    <li><a href="#" className="link-header" >Cadastro de Usuário</a> </li>
                    <li><a href="#" className="link-header" >Cadastro de Taredas</a> </li>
                    <li><a href="#" className="link-header" >Gerenciamento de Tarefas</a> </li>
                </ul>
            </nav>
        </header>
    )

}