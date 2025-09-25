import { render } from "@testing-library/react"
import {describe, it, except} from "vitest"
import CadastroUsuario from "../pages/CadastroUsuario"

describe("Cadastro de usuario",()=>{
    render(<CadastroUsuario/>);
    const nomeInput = screen.getByLabelText(/Nome/i);
})