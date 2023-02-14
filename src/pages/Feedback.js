import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions, history } = this.props;
    const minScore = 3;

    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          {assertions < minScore ? 'Could be better...' : 'Well Done!'}
        </span>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => {
            history.push('/');
          } }
        >
          Jogar Novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => {
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(Feedback);
