import { CHANGE_QUESTION, RESETA_QUESTOES } from '../actions';

const INITIAL_STATE = {
  indexQuestion: 0,
};

const max = 5;

const question = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_QUESTION:
    return {
      indexQuestion: state.indexQuestion > max ? 0 : state.indexQuestion + 1,
    };
  case RESETA_QUESTOES: return {
    indexQuestion: 0,
  };
  default:
    return state;
  }
};

export default question;
