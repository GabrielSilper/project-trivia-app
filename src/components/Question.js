import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { atualizaScore, changeQuestion } from '../redux/actions';
import { shuffleArray } from '../services/Helpers';
import css from '../styles/Question.module.css';

class Question extends Component {
  state = {
    answers: [],
    reveal: false,
    timer: 30,
  };

  componentDidMount() {
    const { correctAnswer, incorrectAnswers } = this.props;
    this.setState({
      answers: shuffleArray([correctAnswer, ...incorrectAnswers]),
    });
    const oneSecond = 1000;
    this.countDown = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      const { timer } = this.state;
      if (timer === 1) {
        clearInterval(this.countDown);
        this.setState({ reveal: true });
      }
    }, oneSecond);
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

  onClickNextQuestion = () => {
    const { name,
      gravatarEmail,
      score,
      dispatch,
      indexQuestion,
      onClickNext,
    } = this.props;
    const max = 4;
    if (indexQuestion === max) {
      const playerInfo = {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${gravatarEmail}`,
      };
      const storage = JSON.parse(localStorage.getItem('ranking'));
      if (storage) {
        localStorage.setItem('ranking', JSON.stringify([...storage, playerInfo]));
      } else {
        localStorage.setItem('ranking', JSON.stringify([playerInfo]));
      }
      onClickNext();
    }
    dispatch(changeQuestion());
  };

  handleClick = (correctAnswer, answer) => {
    const { difficulty, dispatch } = this.props;
    const { timer } = this.state;
    clearInterval(this.countDown);
    this.setState({ reveal: true });

    const difficultyPoint = () => {
      switch (difficulty) {
      case 'hard':
        return 2 + 1;
      case 'medium':
        return 2;
      case 'easy':
        return 1;
      default:
        return 1;
      }
    };

    const point = 10;
    const total = point + difficultyPoint() * timer;

    if (correctAnswer === answer) {
      dispatch(atualizaScore(total));
    }
  };

  render() {
    const { category, question, correctAnswer } = this.props;
    const { answers, timer, reveal } = this.state;
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
              type="button"
              data-testid={ this.verifyIsCorrect(answer) }
              key={ answer }
              className={ this.handleStyles(correctAnswer, answer) }
              onClick={ () => this.handleClick(correctAnswer, answer) }
              disabled={ reveal }
            >
              {answer}
            </button>
          ))}
        </div>
        { reveal
          ? (
            <div>
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.onClickNextQuestion }
              >
                Next
              </button>
            </div>
          ) : null}
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

const mapStateToProps = (state) => ({
  indexQuestion: state.question.indexQuestion,
  ...state.player,
});

export default connect(mapStateToProps)(Question);
