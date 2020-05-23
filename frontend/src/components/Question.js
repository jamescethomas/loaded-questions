import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions.js';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import StompClient from "react-stomp-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'



class Question extends Component {
  render() {
    var guesser;
    for(let i = 0; i < this.props.gameState.players.length; i++) {
      if (this.props.gameState.players[i].role === "GUESS") {
        guesser = this.props.gameState.players[i];
      }
    }

    return <Paper className="paper">
    <h1>Question from <span className="text-highlight">{guesser.name}</span></h1>
    <p className="question">{this.props.gameState.game.currentQuestion}</p>
        </Paper>
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    	actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Question)
);
