import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getQuestions } from '../services/api';
import Question from '../components/Question';

export default class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }

    const result = await getQuestions(token);
    const questions = result.results;

    if (questions && questions.length < 1) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({ questions });
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <h2>Game</h2>

        <div>
          {questions.map((info) => (
            <Question
              { ...info }
              key={ info.question }
              correctAnswer={ info.correct_answer }
              incorrectAnswers={ info.incorrect_answers }
            />
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
