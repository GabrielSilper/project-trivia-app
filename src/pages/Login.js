import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import getToken from '../services/getToken';
// import './App.css';
import logo from '../trivia.png';
import { enviaDadosLogin, resetaQuestoes, resetaScore } from '../redux/actions';

class Login extends Component {
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
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const token = await getToken();
    const emailConvertido = md5(email).toString();
    localStorage.setItem('token', token);
    const payload = {
      name,
      gravatarEmail: emailConvertido,
    };
    dispatch(enviaDadosLogin(payload));
    dispatch(resetaQuestoes());
    dispatch(resetaScore());
    history.push('/game');
  };

  render() {
    const { history } = this.props;
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
            onClick={ () => {
              history.push('/settings');
            } }
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

export default connect()(Login);
