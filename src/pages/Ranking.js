import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = ranking.sort((x, y) => y.score - x.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <ol>
            {sortRanking.map((player, index) => (
              <li key={ player.name }>
                <img src={ player.picture } alt={ player.name } />
                <p data-testid={ `player-name-${index}` }>
                  {player.name}
                </p>
                <p data-testid={ `player-score-${index}` }>
                  {player.score}
                </p>
              </li>
            ))}
          </ol>

        </div>

        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => {
            history.push('/');
          } }
        >
          Início
        </button>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};
