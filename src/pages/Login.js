import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getToken from '../services/getToken';
// import './App.css';
import logo from '../trivia.png';

export default class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const lengthName = 0;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            <input
              data-testid="input-player-name"
              id="name"
              name="name"
              type="text"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !(emailPattern.test(email) && name.length > lengthName) }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;
