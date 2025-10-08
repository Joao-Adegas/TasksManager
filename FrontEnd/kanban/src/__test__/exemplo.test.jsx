import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest"
import CadastroUsuario from "../pages/CadastroUsuario"
import "@testing-library/jest-dom";
import CadastroTarefas from "../pages/CadastroTarefas";
import Swal from 'sweetalert2';
import axios from 'axios';

// Mock do SweetAlert2 para Vitest
vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn()
    }
}));

// Mock do axios
vi.mock('axios');

/* =============================================================================================================================================================== */
/*                                                            TESTES DE CADASTRO DE USUARIO                                                                        */
/* =============================================================================================================================================================== */

describe("Cadastro de usuario", () => {

    beforeEach(() => {
        // Limpa todos os mocks antes de cada teste
        vi.clearAllMocks();

        // Configura o mock do axios para retornar sucesso por padrão
        axios.post.mockResolvedValue({
            data: { id: 1, nome: "João Silva", email: "joao@gmail.com" }
        });
    });

    it("deve renderizar o input de nome", () => {
        render(<CadastroUsuario />);
        const nomeInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);

        expect(nomeInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
    })

    it("deve renderizar o botão de cadastro", () => {
        render(<CadastroUsuario />);
        const button = screen.getByRole("button", { name: /Cadastrar/i });
        expect(button).toBeInTheDocument();
    });

    it("deve exibir erro se nome tiver menos de 3 caracteres", async () => {
        render(<CadastroUsuario />);
        await userEvent.type(screen.getByLabelText(/Nome/i), "Jo");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText("Mínimo de 3 caracteres e maximo 15.")).toBeInTheDocument();
    });

    it("deve exibir erro se nome tiver mais de 15 caracteres", async () => {
        render(<CadastroUsuario />);
        await userEvent.type(screen.getByLabelText(/Nome/i), "Esse nome possui mais de quinze caracteres");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText("Mínimo de 3 caracteres e maximo 15.")).toBeInTheDocument();
    });

    it("deve exibir erro se nome tiver caracteres especiais [ !@#$%¨&*(){}[]ºª°/;:-_=+ ]", async () => {
        render(<CadastroUsuario />);
        await userEvent.type(screen.getByLabelText(/Nome/i), "Jo^");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText("Digite apenas letras.")).toBeInTheDocument();
    });

    it("deve exibir erro se apenas o email for preenchido e nome estiver vazio", async () => {
        render(<CadastroUsuario />);
        await userEvent.type(screen.getByLabelText(/Email/i), "joao@gmail.com");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Digite apenas letras/i)).toBeInTheDocument();
    });

    it("deve exibir erro ao inserir um email com 2 '@' ", async () => {
        render(<CadastroUsuario />);
        await userEvent.type(screen.getByLabelText(/Email/i), "joao@@gmail.com");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Email deve estar no formato correto./i)).toBeInTheDocument();
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

    it("deve exibir o Swal após cadastro de usuário válido", async () => {
        render(<CadastroUsuario />);

        await userEvent.type(screen.getByLabelText(/Nome/i), "João Silva");
        await userEvent.type(screen.getByLabelText(/Email/i), "joao@gmail.com");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        // Aguarda a chamada assíncrona do axios e do Swal
        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledTimes(1);
        });

        expect(Swal.fire).toHaveBeenCalledWith(
            expect.objectContaining({
                title: "Cadastro concluído com sucesso!",
                icon: "success",
                draggable: true,
                customClass: expect.objectContaining({
                    popup: "meu-popup",
                    title: "meu-titulo",
                    content: "meu-conteudo",
                    confirmButton: "meu-botao"
                })
            })
        );

        // Verifica se o axios foi chamado com os dados corretos
        expect(axios.post).toHaveBeenCalledWith(
            "http://127.0.0.1:3000/users",
            { nome: "João Silva", email: "joao@gmail.com" }
        );
    });
});

/* =============================================================================================================================================================== */
/*                                                            TESTES DE CADASTRO DE TAREFAS                                                                        */
/* =============================================================================================================================================================== */

describe("Cadastro de Tarefas", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock da requisição GET que busca os usuários
        axios.get.mockResolvedValue({
            data: [
                { id: 1, nome: "João Adegas", email: "joao@email.com" },
                { id: 2, nome: "Fernanda Militã", email: "fernanda@email.com" },
            ]
        });
    });

    it("deve renderizar o input de nome", async () => {
        render(<CadastroTarefas />);

        // Aguarda os usuários serem carregados
        await waitFor(() => {
            expect(screen.getByLabelText(/Usuário/i)).toBeInTheDocument();
        });

        const descricaoInput = screen.getByLabelText(/Descrição/i);
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

        // Aguarda os usuários serem carregados
        await waitFor(() => {
            expect(screen.getByRole("option", { name: /João Adegas/i })).toBeInTheDocument();
        });

        await userEvent.type(screen.getByLabelText(/Descrição/i), "Reunião semanal");
        await userEvent.type(screen.getByLabelText(/Setor/i), "Marketing");

        const usuarioSelect = screen.getByLabelText(/Usuário/i);
        const prioridadeSelect = screen.getByLabelText(/Prioridade/i);

        await userEvent.selectOptions(usuarioSelect, "1");
        await userEvent.selectOptions(prioridadeSelect, "Alta");

        expect(screen.getByLabelText(/Descrição/i)).toHaveValue("Reunião semanal");
        expect(screen.getByLabelText(/Setor/i)).toHaveValue("Marketing");
    });

    it("deve exibir erro ao preencher apenas a descrição", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Descrição/i), "Reunião Semanal");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/O setor deve ter ao menos 2 caracteres./i)).toBeInTheDocument();
        expect(await screen.findByText(/Escolha um usuário/i)).toBeInTheDocument();
        expect(await screen.findByText(/A prioridade deve ser apenas Alta, Baixa ou Media/i)).toBeInTheDocument();
    });

    it("deve exibir erros ao preencher apenas o campo setor", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Setor/i), "Marketing");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Minimo de 5 caracteres e maximo de 25/i)).toBeInTheDocument();
        expect(await screen.findByText(/Escolha um usuário/i)).toBeInTheDocument();
        expect(await screen.findByText(/A prioridade deve ser apenas Alta, Baixa ou Media/i)).toBeInTheDocument();
    });


    it("deve exibir erros ao preencher apenas o campo prioridade", async () => {
        render(<CadastroTarefas />);
        const prioridadeSelect = screen.getByLabelText(/Prioridade/i);
        await userEvent.selectOptions(prioridadeSelect, "Alta");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Minimo de 5 caracteres e maximo de 25/i)).toBeInTheDocument();
        expect(await screen.findByText(/O setor deve ter ao menos 2 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/Escolha um usuário/i)).toBeInTheDocument();
    });


    it("deve exibir erros ao preencher apenas o campo usuário", async () => {
        render(<CadastroTarefas />);

        const option = await screen.findByRole("option", { name: /João Adegas/i });
        const usuarioSelect = screen.getByLabelText(/Usuário/i);
        await userEvent.selectOptions(usuarioSelect, option);

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Minimo de 5 caracteres e maximo de 25/i)).toBeInTheDocument();
        expect(await screen.findByText(/O setor deve ter ao menos 2 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/A prioridade deve ser apenas Alta, Baixa ou Media/i)).toBeInTheDocument();
    });

    it("deve exibir erro ao preencher a descrição com mais de 25 caracteres", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Descrição/i), "Reunião Semanal da Semana do Mês, aquela reunião cansativa demais que você faz com seu chefe porque ele adora encher seu saco, e você finge que esta tudo bem porque você precisa de salário pra comprar o ps no final do ano");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Minimo de 5 caracteres e maximo de 25/i)).toBeInTheDocument();
    });

    it("deve exibir erro ao preencher a descrição com menos de 2 caracteres", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Descrição/i), "R");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/O setor deve ter ao menos 2 caracteres./i)).toBeInTheDocument();
    });

    it("deve exibir erro ao preencher a descrição com caracteres especiais", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Descrição/i), "Reunião@@@");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Somente letras e espaços/i)).toBeInTheDocument();
    });


    it("deve exibir erros ao preencher o campo setor com mais de 15 caracteres", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Setor/i), "Teste do campo Setor com mais de quinze caracteres.");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/O setor pode ter no máximo 15 caracteres./i)).toBeInTheDocument();
    });

    it("deve exibir erros ao preencher o campo setor com menos de 2 caracteres", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Setor/i), "T");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/O setor deve ter ao menos 2 caracteres./i)).toBeInTheDocument();
    });

    it("deve exibir erros ao preencher o campo setor com caracteres especiais", async () => {
        render(<CadastroTarefas />);
        await userEvent.type(screen.getByLabelText(/Setor/i), "Tad@@");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        expect(await screen.findByText(/Sem caracteres especiais; não permite dois espaços seguidos./i)).toBeInTheDocument();
    });

    it("deve exibir o Swal após cadastro de tarefas válido", async () => {
        render(<CadastroTarefas />);

        // Aguarda os usuários serem carregados
        await waitFor(() => {
            expect(screen.getByRole("option", { name: /João Adegas/i })).toBeInTheDocument();
        });

        await userEvent.type(screen.getByLabelText(/Descrição/i), "Reunião semanal");
        await userEvent.type(screen.getByLabelText(/Setor/i), "Marketing");

        const usuarioSelect = screen.getByLabelText(/Usuário/i);
        const prioridadeSelect = screen.getByLabelText(/Prioridade/i);

        await userEvent.selectOptions(usuarioSelect, "1");
        await userEvent.selectOptions(prioridadeSelect, "Alta");

        const button = screen.getByRole("button", { name: /Cadastrar/i });
        await userEvent.click(button);

        // Verifica se Swal foi chamado
        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledTimes(1);
        });

        expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
            title: "Tarefa criada com sucesso!",
            icon: "success",
            draggable: true
        }));

        // Verifica se axios foi chamado com os dados corretos
        expect(axios.post).toHaveBeenCalledWith(
            "http://127.0.0.1:3000/tasks",
            {
                descricao: "Reunião semanal",
                setor: "Marketing",
                usuario: "1",
                prioridade: "Alta"
            }
        );
    });

})