import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { shuffleArray } from '../services/Helpers';
import css from '../styles/Question.module.css';

export default class Question extends Component {
  state = {
    answers: [],
    reveal: false,
    timer: 30,
  };

  componentDidMount() {
    const { correctAnswer, incorrectAnswers } = this.props;
    this.setState({ answers: shuffleArray([correctAnswer, ...incorrectAnswers]) });
    const second = 1000;
    this.countDown = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      const { timer } = this.state;
      if (timer === 1) {
        clearInterval(this.countDown);
        this.setState({ reveal: true });
      }
    }, second);
  }

  verifyIsCorrect = (alternative) => {
    const { incorrectAnswers, correctAnswer } = this.props;
    let result = `wrong-answer-${incorrectAnswers.indexOf(alternative)}`;
    if (correctAnswer === alternative) {
      result = 'correct-answer';
    }
    return result;
  };

  handleStyles = (correctAnswer, answer) => {
    const { reveal } = this.state;
    if (reveal) {
      return correctAnswer === answer ? css.correct : css.wrong;
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ reveal: true });
  };

  render() {
    const { category, question, correctAnswer } = this.props;
    const { answers, timer } = this.state;
    return (
      <div>
        <p>
          Tempo restante:
          {timer}
        </p>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {answers.map((answer) => (
            <button
              data-testid={ this.verifyIsCorrect(answer) }
              key={ answer }
              className={ this.handleStyles(correctAnswer, answer) }
              onClick={ this.handleClick }
              disabled={ timer === 0 }
            >
              {answer}
            </button>))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.shape({
    indexOf: PropTypes.func,
  }),
  question: PropTypes.string,
}.isRequired;
