import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
