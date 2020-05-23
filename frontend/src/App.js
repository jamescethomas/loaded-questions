import React from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from './components/Nav.js';

import Home from './pages/Home.js';
import Join from './pages/Join.js';
import Create from './pages/Create.js';
import Game from './pages/Game.js';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'

import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


const theme = createMuiTheme({
  root: {
    flexGrow: 1,
  },
  palette: {
    type: 'dark',
    primary: blue,
    secondary: red,
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <Nav/>
      <div className="app-body">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/join' component={Join}/>
          <Route path='/create' component={Create}/>
          <Route path='/game' component={Game}/>
          <Route component={Home}/>
        </Switch>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default withRouter(App);
