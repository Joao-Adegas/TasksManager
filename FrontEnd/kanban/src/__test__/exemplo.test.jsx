import { render,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest"
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

    it("deve renderizar o botão de cadastro", () => {
        render(<CadastroUsuario />);
        const button = screen.getByRole("button", { name: /Cadastrar/i });
        expect(button).toBeInTheDocument();   
    });


    it("deve exibir mensagens de erro ao enviar formulário vazio", async () => {
        render(<CadastroUsuario />);
        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Digite apenas letras/i)).toBeInTheDocument();
        expect(await screen.findByText(/Email deve estar no formato correto/i)).toBeInTheDocument();
    });

    it("deve aceitar dados válidos no formulário", async () => {
        render(<CadastroUsuario />);
        await userEvent.type(screen.getByLabelText(/Nome/i), "João Silva");
        await userEvent.type(screen.getByLabelText(/Email/i), "joao@email.com");

        expect(screen.getByLabelText(/Nome/i)).toHaveValue("João Silva");
        expect(screen.getByLabelText(/Email/i)).toHaveValue("joao@email.com");
    });

})

describe("Cadastro de Tarefas", () => { // define um grupo de testes
    it("deve renderizar o input de nome", () => {
        render(<CadastroTarefas />); // renderiza o componente criando uma versão virtual
        const descricaoInput = screen.getByLabelText(/Descrição/i); // procura no DOM o componente
        const usuarioInput = screen.getByLabelText(/Usuário/i);
        const prioridadeSelect = screen.getByLabelText(/prioridade/i);
        const setorInput = screen.getByLabelText(/Setor/i);

        
        expect(descricaoInput).toBeInTheDocument();
        expect(usuarioInput).toBeInTheDocument();
        expect(prioridadeSelect).toBeInTheDocument();
        expect(setorInput).toBeInTheDocument();
    })

    it("deve renderizar o botão de cadastro", () => {
        render(<CadastroTarefas />);
        const button = screen.getByRole("button", { name: /Cadastrar/i });
        expect(button).toBeInTheDocument();
    });

    it("deve exibir mensagens de erro ao enviar formulário vazio", async () => {
        render(<CadastroTarefas />);
        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Minimo de 5 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/O setor deve ter ao menos 2 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/Escolha um usuário/i)).toBeInTheDocument();
        expect(await screen.findByText(/A prioridade deve ser apenas Alta/i)).toBeInTheDocument();
    });

    it("deve aceitar dados válidos no formulário", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Descrição/i), "Reunião semanal");
        await userEvent.type(screen.getByLabelText(/Setor/i), "Marketing");

        const usuarioSelect = screen.getByLabelText(/Usuário/i);
        const prioridadeSelect = screen.getByLabelText(/Prioridade/i);

        await userEvent.selectOptions(usuarioSelect, usuarioSelect.options[1].value);
        await userEvent.selectOptions(prioridadeSelect, "Alta");

        expect(screen.getByLabelText(/Descrição/i)).toHaveValue("Reunião semanal");
        expect(screen.getByLabelText(/Setor/i)).toHaveValue("Marketing");
    });


})