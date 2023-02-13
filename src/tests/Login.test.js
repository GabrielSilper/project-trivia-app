import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "../App";
import Login from "../pages/Login";
import {
  mockDataQuestions,
  mockDataToken,
  mockInitialState,
} from "./helpers/mockData";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe("Testando o componente Login:", () => {
  test("Verifica se existe uma image logo e com source correto.", () => {
    renderWithRouterAndRedux(<Login />);
    //Acessando elementos
    const logoTrivia = screen.getByRole("img", {
      name: /logo/i,
    });

    //Testando os elementos
    expect(logoTrivia).toBeInTheDocument();
    expect(logoTrivia).toHaveProperty("src", "http://localhost/trivia.png");
  });

  test("Verifica se existe os campos para digitar E-mail e Nome.", () => {
    renderWithRouterAndRedux(<Login />);
    //Acessando elementos
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nomeInput = screen.getByPlaceholderText(/nome/i);

    //Testando os elementos
    expect(emailInput).toBeInTheDocument();
    expect(nomeInput).toBeInTheDocument();
  });

  test("Verifica se é possível escrever nos campos de E-mail e Nome.", () => {
    renderWithRouterAndRedux(<Login />);
    //Acessando elementos
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nomeInput = screen.getByPlaceholderText(/nome/i);

    //Interagindo com os elementos
    const teste = "teste";
    userEvent.type(emailInput, teste);
    userEvent.type(nomeInput, teste);

    //Testando os elementos
    expect(emailInput).toHaveValue(teste);
    expect(nomeInput).toHaveValue(teste);
  });

  test("Verifica se existe os botões Jogar e Configurações.", () => {
    renderWithRouterAndRedux(<Login />);
    //Acessando elementos
    const btnJogar = screen.getByRole("button", { name: /jogar/i });
    const btnConfig = screen.getByRole("button", { name: /configurações/i });

    //Testando os elementos
    expect(btnJogar).toBeInTheDocument();
    expect(btnConfig).toBeInTheDocument();
  });

  test("Verifica se o botão Jogar é habilitado após a validação.", () => {
    renderWithRouterAndRedux(<Login />);
    //Acessando elementos
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nomeInput = screen.getByPlaceholderText(/nome/i);
    const btnJogar = screen.getByRole("button", { name: /jogar/i });

    //Testando se o botão inicia desabilitado.
    expect(btnJogar).toBeDisabled();

    //Interagindo com os elementos
    const testeEmail = "teste@teste.com";
    const testeNome = "Fulano";
    userEvent.type(emailInput, testeEmail);
    userEvent.type(nomeInput, testeNome);

    //Testando se o botão é habilitado.
    expect(btnJogar).not.toBeDisabled();
  });

  test("Verifica se ao clicar no botão Jogar são feitas as requisições as APIs e salva os dados.", async () => {
    // Fazendo o primeiro mock do fetch para simular a requisição a API
    // Obs.: Existe na pasta helpers um arquivo chamado MockData para armazenar as informações que preciso pra simular as APIs.
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataToken),
    });

    const { store } = renderWithRouterAndRedux(<App />, mockInitialState);
    //Constante usadas para testes
    const testeEmail = "teste@teste.com";
    const testeNome = "Fulano";
    const hashExata = "ce11fce876c93ed5d2a72da660496473";

    //Acessando elementos
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nomeInput = screen.getByPlaceholderText(/nome/i);
    const btnJogar = screen.getByRole("button", { name: /jogar/i });

    //Verificando se o email e nome do Estado Global está vazio.
    expect(store.getState().player.name).toBe("");
    expect(store.getState().player.gravatarEmail).toBe("");

    //Interagindo com os elementos
    userEvent.type(emailInput, testeEmail);
    userEvent.type(nomeInput, testeNome);
    userEvent.click(btnJogar);

    //Testando se a API de token foi chamada após apertar o botão.
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://opentdb.com/api_token.php?command=request"
    );

    //Limpando o mock anterior pra não interferir na próxima simulação de API
    jest.clearAllMocks();
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataQuestions),
    });

    // Esperando todos os elementos carregarem para simular aplicação rodando no PC do usuário e efetuar os testes com sucesso.
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /game/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/Science: Computers/i));
    });

    //Testando se a API de questões foi chamada.
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://opentdb.com/api.php?amount=5&token=5f2a4b191eed3c60be7669cd3475b3e996a4e4f0cf214527f1ca88a8211b14f6"
    );

    //Testando se o Email e Nome do estado global foram atualizados.
    expect(store.getState().player.name).toBe(testeNome);
    expect(store.getState().player.gravatarEmail).toBe(hashExata);
  });

  test("Verifica se clicar no botão Configurações redireciona para página Settings ", () => {
    const { history } = renderWithRouterAndRedux(<App />, mockInitialState);

    //Acessando elementos
    const btnConfig = screen.getByRole("button", { name: /configurações/i });

    //Interagindo com os elementos
    act(() => {
      userEvent.click(btnConfig);
    });

    //Testando a página
    expect(
      screen.getByRole("heading", { name: /settings/i })
    ).toBeInTheDocument();
  });
});
