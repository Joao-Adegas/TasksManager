import "../styles/CadUsuario.scss"

export default function CadastroUsuario(){
    return(
        
        <section>
            <div className="container-form">
                <h1>Cadastro de usuário</h1>
                <form className="form">

                    <div className="input">
                        <label>Nome:</label>
                        <input type="text" />
                    </div>

                    <div className="input">
                        <label>Email:</label>
                        <input type="text" />
                    </div>
                    <button className="btn">Cadastrar</button>
                </form>
            </div>
        </section>
    )
}