import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt={ `avatar-de-${name}` }
        />
        <h2
          data-testid="header-player-name"
        >
          { name }
        </h2>
        <h2
          data-testid="header-score"
        >
          Pontuação
          {' '}
          { score }
        </h2>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
