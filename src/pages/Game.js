import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getQuestions } from '../services/api';
import Question from '../components/Question';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    questions: [],
    actualQuestion: 0,
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
    const { questions, actualQuestion } = this.state;
    return (
      <div>
        <Header />
        <h2>Game</h2>

        <div>
          {questions.map((info, i) => (
            i === actualQuestion
          && <Question
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
