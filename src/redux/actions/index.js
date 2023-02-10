export const DADOS_LOGIN = 'DADOS_LOGIN';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const CHANGE_REVEAL = 'CHANGE_REVEAL';

export const enviaDadosLogin = (payload) => ({
  type: DADOS_LOGIN,
  payload,
});

export const changeQuestion = () => ({
  type: CHANGE_QUESTION,
});

export const changeReveal = () => ({
  type: CHANGE_REVEAL,
});
