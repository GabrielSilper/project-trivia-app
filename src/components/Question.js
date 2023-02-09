import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { shuffleArray } from '../services/Helpers';

export default class Question extends Component {
  verifyIsCorrect = (alternative) => {
    const { incorrectAnswers, correctAnswer } = this.props;
    if (correctAnswer === alternative) {
      return 'correct-answer';
    }
    const index = incorrectAnswers.indexOf(alternative);
    return `wrong-answer-${index}`;
  };

  render() {
    const { category, question, correctAnswer, incorrectAnswers } = this.props;
    const answers = shuffleArray([correctAnswer, ...incorrectAnswers]);

    return (
      <div>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {answers.map((answer) => (
            <button
              data-testid={ this.verifyIsCorrect(answer) }
              key={ answer }
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
