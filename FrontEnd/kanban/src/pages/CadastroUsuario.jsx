import "../styles/CadUsuario.scss"

export default function CadastroUsuario(){
    return(
        
        <section>
            <div className="container-form">
                <h1>Cadastro de usuário</h1>
                <form className="form">

                    <div className="input">
                        <p>Nome:</p>
                        <input type="text" />
                    </div>

                    <div className="input">
                        <p>Email:</p>
                        <input type="text" />
                    </div>
                    <button>Cadastrar</button>
                </form>
            </div>
        </section>
    )
}