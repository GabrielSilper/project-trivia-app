export const DADOS_LOGIN = 'DADOS_LOGIN';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const ATUALIZA_SCORE = 'ATUALIZA_SCORE';
export const RESETA_QUESTOES = 'RESETA_QUESTOES';
export const RESETA_SCORE = 'RESETA_SCORE';

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

export const resetaQuestoes = () => ({
  type: RESETA_QUESTOES,
});

export const resetaScore = () => ({
  type: RESETA_SCORE,
});
