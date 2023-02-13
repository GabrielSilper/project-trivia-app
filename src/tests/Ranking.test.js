import App from "../App";
import { screen } from "@testing-library/react";
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import { playerOne, playersRanking } from "./helpers/mockData";
import userEvent from "@testing-library/user-event";

describe("Testando o componente Login:", () => {
  it("Testando se é renderizado o botão para direcionar para pagina inicial", () => {
    localStorage.setItem("ranking", JSON.stringify(playersRanking));
    const { history } = renderWithRouterAndRedux(
      <App />,
      playerOne,
      "/ranking"
    );

    const button = screen.getByRole("button", { name: /início/i });
    userEvent.click(button);
    expect(history.location.pathname).toBe("/");
  });
});
