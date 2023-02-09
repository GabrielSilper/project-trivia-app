import { DADOS_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '', // NOME DA PESSOA
  assertions: '', // número - de - acertos,
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
  default:
    return state;
  }
};

export default player;
