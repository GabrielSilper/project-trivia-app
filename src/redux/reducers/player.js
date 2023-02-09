const INITIAL_STATE = {
  name: '', // NOME DA PESSOA
  assertions: '', // número - de - acertos,
  score: '', // pontuação,
  gravatarEmail: '', // email - da - pessoa,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default player;
