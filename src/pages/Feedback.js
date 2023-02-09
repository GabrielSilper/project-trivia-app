import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { score } = this.props;
    const minScore = 3;

    return (
      <div>
        <span data-testid="feedback-text">
          { (score < minScore) ? 'Could be better...' : 'Well Done!'}

        </span>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
