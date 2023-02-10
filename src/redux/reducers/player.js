import { ATUALIZA_SCORE, DADOS_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '', // NOME DA PESSOA
  assertions: 0, // número - de - acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email - da - pessoa,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DADOS_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case ATUALIZA_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
