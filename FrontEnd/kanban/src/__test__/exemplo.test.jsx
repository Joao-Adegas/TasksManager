import { render,screen } from "@testing-library/react"
import { describe, it, except } from "vitest"
import CadastroUsuario from "../pages/CadastroUsuario"
import "@testing-library/jest-dom"; // ← isso adiciona toBeInTheDocument
import CadastroTarefas from "../pages/CadastroTarefas";


describe("Cadastro de usuario", () => { // define um grupo de testes
    it("deve renderizar o input de nome", () => {
        render(<CadastroUsuario />); // renderiza o componente criando uma versão virtual
        const nomeInput = screen.getByLabelText(/Nome/i); // procura no DOM o componente
        const emailInput = screen.getByLabelText(/Email/i);
        expect(nomeInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    })
})

describe("Cadastro de Tarefas", () => { // define um grupo de testes
    it("deve renderizar o input de nome", () => {
        render(<CadastroTarefas />); // renderiza o componente criando uma versão virtual
        const descricaoInput = screen.getByLabelText(/Descricao/i); // procura no DOM o componente
        const usuarioInput = screen.getByLabelText(/Usuário/i);
        const setorInput = screen.getByLabelText(/Setor/i);
        expect(nomeInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    })
})