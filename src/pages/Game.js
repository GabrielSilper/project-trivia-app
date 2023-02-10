import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../services/api';
import Question from '../components/Question';
import Header from '../components/Header';

class Game extends Component {
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

    this.setState({
      questions,
    });
  }

  onClickNext = () => {
    const { history } = this.props;
    history.push('/feedback');
  };

  render() {
    const { questions } = this.state;
    const { indexQuestion, reveal } = this.props;
    return (
      <div>
        <Header />
        <h2>Game</h2>

        <div>
          {questions.map((info, i) => (
            i === indexQuestion
          && <Question
            { ...info }
            key={ info.question }
            correctAnswer={ info.correct_answer }
            incorrectAnswers={ info.incorrect_answers }
            onClickNext={ this.onClickNext }
          />
          ))}
        </div>
        <div>
          { reveal
            ? (
              <div>
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ this.onClickNext }
                >
                  Next
                </button>
              </div>
            ) : null}
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

const mapStateToProps = (state) => ({
  indexQuestion: state.question.indexQuestion,
});

export default connect(mapStateToProps)(Game);
