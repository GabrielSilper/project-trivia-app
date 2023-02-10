export const DADOS_LOGIN = 'DADOS_LOGIN';
export const ATUALIZA_SCORE = 'ATUALIZA_SCORE';

export const enviaDadosLogin = (payload) => ({
  type: DADOS_LOGIN,
  payload,
});

export const atualizaScore = (payload) => ({
  type: ATUALIZA_SCORE,
  payload,
});
