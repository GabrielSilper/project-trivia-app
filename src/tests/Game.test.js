import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import {
  playerTwo,
  mockInitialState,
  mockDataToken,
  mockDataQuestions,
  mockAssert,
  playersRanking,
} from "./helpers/mockData";
import App from "../App";
import { getAllByRole, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Testando se o componente de game", () => {
  it("Caso o usuario não tenha um token salvo, é direcionado para pagina inicial", () => {
    const { history } = renderWithRouterAndRedux(<App />, playerTwo, "/game");
    expect(history.location.pathname).toBe("/");
  });

  it("Caso falhe a requisição, o usuario é direcionado para tela inicial", () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 3,
        results: [],
      }),
    });

    const { history } = renderWithRouterAndRedux(
      <App />,
      mockInitialState,
      "/game"
    );

    expect(localStorage.getItem("token")).toBe(null);
    expect(history.location.pathname).toBe("/");
  });

  it("Testando se após a ultima pergunta é redirecionado", async () => {
    expect(localStorage.getItem("ranking")).toBe(null);

    localStorage.setItem("ranking", JSON.stringify(playersRanking));

    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataToken),
    });

    const { store } = renderWithRouterAndRedux(<App />, mockInitialState);
    //Constante usadas para testes
    const testeEmail = "teste@teste.com";
    const testeNome = "Fulano";

    //Acessando elementos
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nomeInput = screen.getByPlaceholderText(/nome/i);
    const btnJogar = screen.getByRole("button", { name: /jogar/i });

    //Interagindo com os elementos
    userEvent.type(emailInput, testeEmail);
    userEvent.type(nomeInput, testeNome);
    userEvent.click(btnJogar);

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
    const nextButton = screen.queryByText(/next/i);

    expect(nextButton).not.toBeInTheDocument();

    mockDataQuestions.results.forEach((question) => {
      userEvent.click(
        screen.getByRole("button", {
          name: question.correct_answer,
        })
      );
      userEvent.click(screen.getByRole("button", { name: /next/i }));
    });
    await waitFor(() => {
      screen.getByRole("heading", { name: testeNome });
    });
    screen.getByText(/well done/i);
    const storage = [
      ...playersRanking,
      {
        name: "Fulano",
        score: 320,
        picture:
          "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
      },
    ];
    expect(JSON.parse(localStorage.getItem("ranking"))).toEqual(storage);
  });

  it("Verifica se o cronometro", async () => {

    jest.useFakeTimers();

    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataToken),
    });

    const { store } = renderWithRouterAndRedux(<App />, mockInitialState);
    //Constante usadas para testes
    const testeEmail = "teste@teste.com";
    const testeNome = "Fulano";

    //Acessando elementos
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nomeInput = screen.getByPlaceholderText(/nome/i);
    const btnJogar = screen.getByRole("button", { name: /jogar/i });

    //Interagindo com os elementos
    userEvent.type(emailInput, testeEmail);
    userEvent.type(nomeInput, testeNome);
    userEvent.click(btnJogar);

    //Limpando o mock anterior pra não interferir na próxima simulação de API

    jest.clearAllMocks();
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataQuestions),
    });



    await waitFor(() => {
      expect(screen.getByText(/tempo restante:30/i)).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /next/i })
      ).not.toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(29500);
    });
    screen.logTestingPlaygroundURL();
    await waitFor(() => {
      expect(screen.getByText(/tempo restante:0/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });
  });

  it("Testando se o localStorage é salvo corretamente", async () => {

    jest.useFakeTimers();

    localStorage.removeItem('ranking');
    expect(localStorage.getItem("ranking")).toBe(null);

    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataToken),
    });

    const { store } = renderWithRouterAndRedux(<App />, mockInitialState);
    //Constante usadas para testes
    const testeEmail = "teste@teste.com";
    const testeNome = "Fulano";

    //Acessando elementos
    const emailInput = screen.getByPlaceholderText(/email/i);
    const nomeInput = screen.getByPlaceholderText(/nome/i);
    const btnJogar = screen.getByRole("button", { name: /jogar/i });

    //Interagindo com os elementos
    userEvent.type(emailInput, testeEmail);
    userEvent.type(nomeInput, testeNome);
    userEvent.click(btnJogar);

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
    
    act(() => {
        jest.advanceTimersByTime(5000)
    })
    
    const nextButton = screen.queryByText(/next/i);
    expect(nextButton).not.toBeInTheDocument();


    mockDataQuestions.results.forEach((question) => {
      userEvent.click(
        screen.getByRole("button", {
          name: question.incorrect_answers[0],
        })
      );
      userEvent.click(screen.getByRole("button", { name: /next/i }));
    });
    await waitFor(() => {
      screen.getByRole("heading", { name: testeNome });
    });
    screen.getByText(/could be better/i);
    const storage = [
      {
        name: "Fulano",
        score: 0,
        picture:
          "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
      },
    ];
    expect(JSON.parse(localStorage.getItem("ranking"))).toEqual(storage);
  });
});
