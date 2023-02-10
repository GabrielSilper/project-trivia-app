export const DADOS_LOGIN = 'DADOS_LOGIN';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const ATUALIZA_SCORE = 'ATUALIZA_SCORE';

export const enviaDadosLogin = (payload) => ({
  type: DADOS_LOGIN,
  payload,
});

export const changeQuestion = () => ({
  type: CHANGE_QUESTION,
});

export const atualizaScore = (payload) => ({
  type: ATUALIZA_SCORE,
  payload,
});
